import { ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import MainMenu from "../mainmenu";

describe("<MainMenu />", () => {
  let mainMenuWrapper: ShallowWrapper;

  beforeAll(() => {
    mainMenuWrapper = shallow(<MainMenu />);
  });

  it("passes", () => {
    expect(mainMenuWrapper).toBeDefined();
  });
});
