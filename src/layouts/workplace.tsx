import React, { FunctionComponent } from "react";
import { mergeStyleSets } from "@fluentui/react";

import CommandMenu from "components/menus/commandmenu";
import MainMenu from "components/menus/mainmenu";

const classes = mergeStyleSets({
  stickybar: {
    width: "100%",
    position: "fixed",
    top: 0,
    zIndex: 999,
  },
});

const WorkplaceLayout: FunctionComponent = (props) => {
  return (
    <React.Fragment>
      <div data-test="workplace-div" className={classes.stickybar}>
        <CommandMenu />
        <MainMenu />
      </div>
      {props.children}
    </React.Fragment>
  );
};

export default WorkplaceLayout;
