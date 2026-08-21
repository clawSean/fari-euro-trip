import assert from "node:assert/strict";
import test from "node:test";
import { daysBetween, getTripStatus, tripEnd, tripStart, tripStops } from "./euro-itinerary";

test("the locked itinerary is continuous and covers the whole trip", () => {
  assert.equal(tripStops[0].start, tripStart);
  assert.equal(tripStops.at(-1)!.end, tripEnd);

  for (let index = 1; index < tripStops.length; index += 1) {
    assert.equal(tripStops[index].start, tripStops[index - 1].end, "stops must hand off cleanly");
    assert.ok(daysBetween(tripStops[index].start, tripStops[index].end) > 0, "each stop needs at least one night");
  }
});

test("trip status reports the right city on each day", () => {
  assert.equal(getTripStatus("2026-08-18").phase, "before");
  assert.equal(getTripStatus("2026-08-18").daysUntilStart, 1);

  const launchDay = getTripStatus("2026-08-19");
  assert.equal(launchDay.phase, "during");
  assert.equal(launchDay.dayNumber, 1);
  assert.equal(launchDay.totalDays, 13);
  assert.equal(launchDay.current?.city, "London");
  assert.equal(launchDay.next?.city, "Florence");

  assert.equal(getTripStatus("2026-08-21").current?.city, "London");
  assert.equal(getTripStatus("2026-08-22").current?.city, "Florence");
  assert.equal(getTripStatus("2026-08-26").current?.city, "Amalfi");
  assert.equal(getTripStatus("2026-08-28").current?.city, "Positano");
  assert.equal(getTripStatus("2026-08-29").current?.city, "Positano");

  const finale = getTripStatus("2026-08-31");
  assert.equal(finale.current?.city, "Rome");
  assert.equal(finale.dayNumber, 13);
  assert.equal(finale.next, null);

  assert.equal(getTripStatus("2026-09-01").phase, "after");
});
