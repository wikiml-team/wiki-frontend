import React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import App from "App";
import Routes from "routes";

describe("<App />", () => {
  let appWrapper: ShallowWrapper;

  beforeAll(() => {
    appWrapper = shallow(<App />);
  });

  it("renders <Routes />", () => {
    const routes = appWrapper.find(Routes);
    expect(routes).toHaveLength(1);
  });
});
