import assert from "node:assert/strict";
import test from "node:test";
import { euroSpotlights, getLocalDateKey } from "./euro-spotlights";

test("Euro Spotlights are complete, ordered, and mobile-readable", () => {
  assert.equal(euroSpotlights.length, 6);

  const releases = euroSpotlights.map((spotlight) => spotlight.release);
  assert.deepEqual(releases, [...releases].sort());
  assert.equal(new Set(releases).size, euroSpotlights.length);

  for (const spotlight of euroSpotlights) {
    assert.match(spotlight.release, /^2026-08-\d{2}$/);
    assert.ok(spotlight.title.length <= 48, `${spotlight.city} title is too long`);
    assert.ok(spotlight.copy.length >= 180, `${spotlight.city} copy is too short`);
    assert.ok(spotlight.copy.length <= 260, `${spotlight.city} copy is too long`);
  }
});

test("Spotlight release keys use the viewer's local calendar date", () => {
  const localNoon = new Date(2026, 7, 19, 12, 0, 0);
  assert.equal(getLocalDateKey(localNoon), "2026-08-19");
});
