import { describe, expect, it } from "vitest";
import { headerState } from "./header-visibility";

describe("headerState", () => {
  it("stays full width at the top of the page", () => {
    expect(headerState(0, 0, false)).toEqual({ compact: false, hidden: false });
  });

  it("compacts after a small scroll and hides only while reading down far", () => {
    expect(headerState(100, 50, false)).toEqual({ compact: true, hidden: false });
    expect(headerState(900, 800, false)).toEqual({ compact: true, hidden: true });
    expect(headerState(800, 900, false)).toEqual({ compact: true, hidden: false });
  });

  it("never hides while pinned (menu open or keyboard focus inside)", () => {
    expect(headerState(900, 800, true)).toEqual({ compact: true, hidden: false });
  });
});
