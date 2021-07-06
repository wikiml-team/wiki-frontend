import React, { FunctionComponent } from "react";

import CommandMenu from "components/menus/commands/";
import MainMenu from "components/menus/mainmenu";

const WorkplaceLayout: FunctionComponent = (props) => {
  return (
    <React.Fragment>
      <CommandMenu />
      <MainMenu />
      {/* <PageContainer>{lastpage}</PageContainer> */}
      {/* <FormsMenu/> */}
    </React.Fragment>
  );
};

export default WorkplaceLayout;
