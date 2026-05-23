import assert from "node:assert/strict";
import test from "node:test";
import { normalizeHref, splitUrlTrailingPunctuation } from "./chat-box.logic";

test("normalizeHref adds https to bare www links", () => {
  assert.equal(normalizeHref("www.example.com/trip"), "https://www.example.com/trip");
  assert.equal(normalizeHref("https://italy.jpop.cloud"), "https://italy.jpop.cloud");
});

test("splitUrlTrailingPunctuation keeps sentence punctuation out of links", () => {
  assert.deepEqual(splitUrlTrailingPunctuation("https://edge.app/foo."), {
    urlText: "https://edge.app/foo",
    trailing: ".",
  });

  assert.deepEqual(splitUrlTrailingPunctuation("www.example.com/path),"), {
    urlText: "www.example.com/path",
    trailing: "),",
  });

  assert.deepEqual(splitUrlTrailingPunctuation("https://italy.jpop.cloud"), {
    urlText: "https://italy.jpop.cloud",
    trailing: "",
  });
});
