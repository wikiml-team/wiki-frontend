import { shallow, ShallowWrapper } from "enzyme";

import MainTheme from "../main";

describe("<Main Theme/>", () => {
  let themeWrapper: ShallowWrapper;

  it("passes", () => {
    expect(MainTheme).toBeDefined();
  });
});
