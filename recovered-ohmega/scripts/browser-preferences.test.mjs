import test from "node:test";
import assert from "node:assert/strict";
import { readLanguage, saveLanguage } from "../app/browser-preferences.mjs";

test("language persistence is optional in restricted browsers", () => {
  const previousWindow = globalThis.window;
  try {
    // Some embedded browsers throw when accessing localStorage itself.
    globalThis.window = { get localStorage() { throw new Error("SecurityError"); } };
    assert.equal(readLanguage(), "en");
    assert.doesNotThrow(() => saveLanguage("fr"));

    // Others allow reads but deny writes (privacy mode or quota).
    globalThis.window = { localStorage: {
      getItem: () => "fr",
      setItem: () => { throw new Error("QuotaExceededError"); },
    } };
    assert.equal(readLanguage(), "fr");
    assert.doesNotThrow(() => saveLanguage("en"));

    const values = new Map([["ohmega-lang", "invalid"]]);
    globalThis.window = { localStorage: {
      getItem: key => values.get(key),
      setItem: (key, value) => values.set(key, value),
    } };
    assert.equal(readLanguage(), "en");
    saveLanguage("fr");
    assert.equal(readLanguage(), "fr");
    saveLanguage("en");
    assert.equal(readLanguage(), "en");
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});
