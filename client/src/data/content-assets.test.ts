import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const repoRoot = process.cwd();
const clientRoot = path.join(repoRoot, "client");
const clientSrcRoot = path.join(clientRoot, "src");
const publicRoot = path.join(clientRoot, "public");
const attachedAssetsRoot = path.join(repoRoot, "attached_assets");

const sourceFiles = [
  "client/src/data/daily-bits.ts",
  "client/src/pages/home.tsx",
  "client/src/components/chat-box.tsx",
];

function parseSource(relativePath: string) {
  const absolutePath = path.join(repoRoot, relativePath);
  return ts.createSourceFile(
    absolutePath,
    readFileSync(absolutePath, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    absolutePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
}

function getPropertyName(name: ts.PropertyName) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text;
  }
  return null;
}

function collectStringProperties(relativePath: string, propertyNames: Set<string>) {
  const file = parseSource(relativePath);
  const values: Array<{ property: string; value: string }> = [];

  function visit(node: ts.Node) {
    if (ts.isPropertyAssignment(node)) {
      const property = getPropertyName(node.name);
      if (
        property &&
        propertyNames.has(property) &&
        (ts.isStringLiteral(node.initializer) || ts.isNoSubstitutionTemplateLiteral(node.initializer))
      ) {
        values.push({ property, value: node.initializer.text });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(file);
  return values;
}

function collectAssetImports(relativePath: string) {
  const file = parseSource(relativePath);
  const imports: string[] = [];

  function visit(node: ts.Node) {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const specifier = node.moduleSpecifier.text;
      if (specifier.startsWith("@assets/")) {
        imports.push(specifier);
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(file);
  return imports;
}

function assertHttpUrl(value: string, label: string) {
  assert.doesNotMatch(value, /\s/, `${label} should not contain whitespace`);
  const parsed = new URL(value);
  assert.match(parsed.protocol, /^https?:$/, `${label} should use HTTP(S)`);
}

function assertPublicAsset(value: string, label: string) {
  const relativePath = value.replace(/^\//, "");
  assert.equal(
    existsSync(path.join(publicRoot, relativePath)),
    true,
    `${label} points at missing public asset: ${value}`,
  );
}

test("source asset imports point at bundled files", () => {
  const imports = sourceFiles.flatMap((file) =>
    collectAssetImports(file).map((specifier) => ({ file, specifier })),
  );

  assert.ok(imports.length > 0, "expected at least one @assets import to verify");

  for (const { file, specifier } of imports) {
    const relativePath = specifier.replace("@assets/", "");
    assert.equal(
      existsSync(path.join(attachedAssetsRoot, relativePath)),
      true,
      `${file} imports missing asset: ${specifier}`,
    );
  }
});

test("daily itinerary image references are usable", () => {
  const imageProperties = collectStringProperties(
    "client/src/data/daily-bits.ts",
    new Set(["heroImageUrl", "imageUrl"]),
  );

  assert.ok(imageProperties.length > 0, "expected itinerary image references");

  for (const { property, value } of imageProperties) {
    const label = `${property}: ${value}`;
    if (value.startsWith("/")) {
      assertPublicAsset(value, label);
    } else {
      assertHttpUrl(value, label);
    }
  }
});

test("daily itinerary links are valid HTTP URLs", () => {
  const links = collectStringProperties("client/src/data/daily-bits.ts", new Set(["url"]));

  assert.ok(links.length > 0, "expected itinerary links");

  for (const { value } of links) {
    assertHttpUrl(value, `itinerary url: ${value}`);
  }
});

test("home lodging links and static downloads stay valid", () => {
  const links = collectStringProperties(
    "client/src/pages/home.tsx",
    new Set(["stayUrl", "airbnbUrl"]),
  );

  assert.ok(links.length > 0, "expected lodging links");

  for (const { property, value } of links) {
    assertHttpUrl(value, `${property}: ${value}`);
  }

  assertPublicAsset("/italy-itinerary.pdf", "download itinerary");
});

test("spotlight image and outbound links are valid URLs", () => {
  const spotlightsPath = path.join(publicRoot, "spotlights.json");
  const parsed = JSON.parse(readFileSync(spotlightsPath, "utf8")) as {
    spotlights?: Array<{ image?: string; link?: string }>;
  };

  assert.ok(parsed.spotlights?.length, "expected spotlight records");

  for (const [index, spotlight] of parsed.spotlights.entries()) {
    assert.ok(spotlight.image, `spotlight ${index} is missing an image`);
    assert.ok(spotlight.link, `spotlight ${index} is missing a link`);
    assertHttpUrl(spotlight.image, `spotlight ${index} image`);
    assertHttpUrl(spotlight.link, `spotlight ${index} link`);
  }
});
