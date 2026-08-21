import assert from "node:assert/strict";
import test from "node:test";
import { euroSpotlights, getLocalDateKey } from "./euro-spotlights";

test("Euro Spotlights cover the whole trip, ordered and mobile-readable", () => {
  assert.equal(euroSpotlights.length, 15);

  const releases = euroSpotlights.map((spotlight) => spotlight.release);
  assert.deepEqual(releases, [...releases].sort());
  assert.equal(new Set(releases).size, euroSpotlights.length);
  assert.equal(releases[0], "2026-08-17");
  assert.equal(releases.at(-1), "2026-08-31");

  for (const spotlight of euroSpotlights) {
    assert.match(spotlight.release, /^2026-08-\d{2}$/);
    assert.ok(spotlight.title.length <= 48, `${spotlight.release} title is too long`);
    assert.ok(spotlight.copy.length >= 180, `${spotlight.release} copy is too short`);
    assert.ok(spotlight.copy.length <= 260, `${spotlight.release} copy is too long`);
  }
});

test("Every Spotlight ships a creator shot idea and caption starter", () => {
  for (const spotlight of euroSpotlights) {
    assert.ok(spotlight.shot.length >= 30, `${spotlight.release} shot is too thin`);
    assert.ok(spotlight.shot.length <= 120, `${spotlight.release} shot is too long`);
    assert.ok(spotlight.caption.length >= 10, `${spotlight.release} caption is too thin`);
    assert.ok(spotlight.caption.length <= 90, `${spotlight.release} caption is too long`);
  }
});

test("Spotlight release keys use the viewer's local calendar date", () => {
  const localNoon = new Date(2026, 7, 19, 12, 0, 0);
  assert.equal(getLocalDateKey(localNoon), "2026-08-19");
});
