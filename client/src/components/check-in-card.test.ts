import assert from "node:assert/strict";
import test from "node:test";
import {
  getCheckInMessage,
  getDefaultCheckIns,
  parseMapsLine,
  toIsoDate,
} from "./check-in-card";

test("getCheckInMessage prefers custom text over staged selections", () => {
  assert.equal(
    getCheckInMessage({
      customPlace: "  Boboli Gardens  ",
      pendingMessage: "View check-in 📸",
      hasAttachedPhotoLocation: true,
      location: "Florence",
    }),
    "Checked in at Boboli Gardens 📍",
  );
});

test("getCheckInMessage falls back through staged, photo, and day location states", () => {
  assert.equal(
    getCheckInMessage({
      customPlace: "",
      pendingMessage: "Food stop check-in 🍝",
      hasAttachedPhotoLocation: true,
      location: "Tuscany",
    }),
    "Food stop check-in 🍝",
  );

  assert.equal(
    getCheckInMessage({
      customPlace: "",
      pendingMessage: null,
      hasAttachedPhotoLocation: true,
      location: "Tuscany",
    }),
    "Photo location check-in 📍",
  );

  assert.equal(
    getCheckInMessage({
      customPlace: "",
      pendingMessage: null,
      hasAttachedPhotoLocation: false,
      location: "Tuscany",
    }),
    "Checked in at Tuscany 📍",
  );
});

test("parseMapsLine extracts maps URL and optional photo-location metadata", () => {
  assert.deepEqual(
    parseMapsLine("https://maps.google.com/?q=43.77683,11.25902 · Location from photo"),
    {
      url: "https://maps.google.com/?q=43.77683,11.25902",
      meta: "Location from photo",
    },
  );

  assert.equal(parseMapsLine("No map here"), null);
});

test("toIsoDate normalizes dates and rejects invalid values", () => {
  assert.equal(toIsoDate(new Date("2026-05-20T16:41:30Z")), "2026-05-20T16:41:30.000Z");
  assert.equal(toIsoDate("not a date"), null);
  assert.equal(toIsoDate(null), null);
});

test("default check-ins are location-aware without auto-posting semantics", () => {
  assert.deepEqual(
    getDefaultCheckIns("Tuscany").map((item) => item.label),
    ["Tuscany", "Food stop", "View", "Gelato"],
  );
  assert.deepEqual(
    getDefaultCheckIns("Rome").map((item) => item.label),
    ["Vatican", "Pantheon", "The Court", "Gelato"],
  );
});
