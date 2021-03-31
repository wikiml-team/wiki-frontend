import { shallow, ShallowWrapper } from "enzyme";
import { CommandBar } from "@fluentui/react";

import CommandMenu from "../";

describe("<Command Menu />", () => {
  let commandMenuWrapper: ShallowWrapper;

  beforeAll(() => {
    commandMenuWrapper = shallow(<CommandMenu />);
  });

  it("renders <CommandBar />", () => {
    const commandbar = commandMenuWrapper.find(CommandBar);
    expect(commandbar).toHaveLength(1);
  });
});
