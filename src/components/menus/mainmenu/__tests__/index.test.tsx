import { shallow, ShallowWrapper } from "enzyme";
import MainMenu from "..";

describe("<MainMenu />", () => {
  let mainMenuWrapper: ShallowWrapper;

  beforeAll(() => {
    mainMenuWrapper = shallow(<MainMenu />);
  });

  it("passes", () => {
    expect(mainMenuWrapper).toBeDefined();
  });
});
