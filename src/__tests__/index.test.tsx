import React from "react";
import App from "../App";

import { ReactWrapper, shallow, ShallowWrapper } from "enzyme";

describe("Index", () => {
  let wrapperApp: ReactWrapper | ShallowWrapper;

  beforeEach(() => {
    wrapperApp = shallow(<App />);
  });

  it("renders the App", () => {
    expect(wrapperApp).toHaveLength(1);
  });
});
