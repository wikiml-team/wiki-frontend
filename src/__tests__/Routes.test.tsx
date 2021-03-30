import { shallow, ShallowWrapper } from "enzyme";
import { Route, Router, Switch } from "react-router-dom";
import Routes from "../routes";

describe("<Routes />", () => {
  let routesWrapper: ShallowWrapper;

  beforeAll(() => {
    routesWrapper = shallow(<Routes />);
  });

  it("renders well", () => {
    expect(routesWrapper).toHaveLength(1);
  });
});
