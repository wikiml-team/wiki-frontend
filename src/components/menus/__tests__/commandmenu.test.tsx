import { isRegExp } from "cypress/types/lodash";
import { ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import CommandMenu from "../commandmenu";

describe("<Command Menu />", () => {
  let commandMenuWrapper: ShallowWrapper;

  beforeAll(() => {
    commandMenuWrapper = shallow(<CommandMenu />);
  });

  it("passes", () => {
    expect(commandMenuWrapper).toBeDefined();
  });
});
