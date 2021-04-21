import React, { FunctionComponent } from "react";
import { mergeStyleSets } from "@fluentui/react";

import CommandMenu from "components/menus/commands/";
import MainMenu from "components/menus/mainmenu";

const classes = mergeStyleSets({
  topstickybar: {
    width: "100%",
    position: "fixed",
    top: 0,
    zIndex: 999,
  },
  bottomstickybar: {
    // width: "100%",
    position: "fixed",
    bottom: 0,
    zIndex: 999,
  },
});

const WorkplaceLayout: FunctionComponent = (props) => {
  return (
    <React.Fragment>
      <CommandMenu />
      <MainMenu />
      {props.children}
    </React.Fragment>
  );
};

export default WorkplaceLayout;
