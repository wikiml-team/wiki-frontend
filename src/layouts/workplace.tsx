import React, { FunctionComponent } from "react";

import CommandMenu from "components/menus/commands/";
import MainMenu from "components/menus/mainmenu";

const WorkplaceLayout: FunctionComponent = (props) => {
  return (
    <React.Fragment>
      <CommandMenu />
      <MainMenu />
    </React.Fragment>
  );
};

export default WorkplaceLayout;
