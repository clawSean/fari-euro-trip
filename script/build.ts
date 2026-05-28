import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { mkdir, rm, readFile, writeFile } from "fs/promises";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "@neondatabase/serverless",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();
  await createShareAliases();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

async function createShareAliases() {
  const sharePath = "travel-companion";
  const shareUrl = `https://italy.jpop.cloud/${sharePath}`;
  const indexHtml = await readFile("dist/public/index.html", "utf-8");
  const shareHtml = indexHtml
    .replace('href="https://italy.jpop.cloud/"', `href="${shareUrl}"`)
    .replace('content="https://italy.jpop.cloud/"', `content="${shareUrl}"`);

  await mkdir(`dist/public/${sharePath}`, { recursive: true });
  await writeFile(`dist/public/${sharePath}/index.html`, shareHtml);
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
