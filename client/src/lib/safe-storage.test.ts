import assert from "node:assert/strict";
import test from "node:test";
import { readLocalStorage, writeLocalStorage } from "./safe-storage";

function withWindow(value: Window, run: () => void) {
  const original = Object.getOwnPropertyDescriptor(globalThis, "window");
  Object.defineProperty(globalThis, "window", { configurable: true, value });

  try {
    run();
  } finally {
    if (original) {
      Object.defineProperty(globalThis, "window", original);
    } else {
      delete (globalThis as typeof globalThis & { window?: Window }).window;
    }
  }
}

test("safe storage tolerates browsers that deny localStorage", () => {
  const deniedWindow = {} as Window;
  Object.defineProperty(deniedWindow, "localStorage", {
    get() {
      throw new DOMException("Access denied", "SecurityError");
    },
  });

  withWindow(deniedWindow, () => {
    assert.equal(readLocalStorage("trip"), null);
    assert.equal(writeLocalStorage("trip", "ready"), false);
  });
});

test("safe storage reads and writes when storage is available", () => {
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
  } as Storage;

  withWindow({ localStorage: storage } as Window, () => {
    assert.equal(writeLocalStorage("trip", "ready"), true);
    assert.equal(readLocalStorage("trip"), "ready");
  });
});
