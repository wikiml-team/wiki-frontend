import { shallow, ShallowWrapper } from "enzyme";

import WorkplaceLayout from "layouts/workplace";
import CommandMenu from "components/menus/commands/";
import MainMenu from "components/menus/mainmenu";

describe("Workplace Layout", () => {
  let workplaceWrapper: ShallowWrapper;

  beforeAll(() => {
    workplaceWrapper = shallow(
      <WorkplaceLayout>
        <p data-test="work-child" />
      </WorkplaceLayout>
    );
  });

  it("renders children", () => {
    const children = workplaceWrapper.find("[data-test='work-child']");
    expect(children).toHaveLength(1);
  });

  it("has a sticky bar", () => {
    const divElement = workplaceWrapper.find("[data-test='workplace-div']");
    expect(divElement).toHaveLength(1);

    const hasStickyclass = divElement.hasClass(/stickybar-(\d\d)/);
    expect(hasStickyclass).toBeTruthy();
  });

  it("renders <CommandMenu />", () => {
    const commandMenu = workplaceWrapper.find(CommandMenu);
    expect(commandMenu).toHaveLength(1);
  });

  it("renders <MainMenu />", () => {
    const mainMenu = workplaceWrapper.find(MainMenu);
    expect(mainMenu).toHaveLength(1);
  });
});
