import {
  blueButtonStyles,
  whiteIconStyle,
  blackIconStyle,
} from "../commandstyles";

describe("Commandbar Styles", () => {
  it("passes", () => {
    expect(blueButtonStyles).toBeDefined();
    expect(whiteIconStyle).toBeDefined();
    expect(blackIconStyle).toBeDefined();
  });
});
