import React, { FunctionComponent } from "react";
import { mergeStyleSets, Stack } from "@fluentui/react";

import CommandMenu from "components/menus/commands/";
import MainMenu from "components/menus/mainmenu";
import PagesTabs from "components/menus/pagestabs";

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
      {/* <Stack className={classes.topstickybar}> */}
      <CommandMenu />
      <MainMenu />
      {/* </Stack> */}
      <Stack className={classes.bottomstickybar}>
        <PagesTabs />
      </Stack>
      {/* <div className={classes.bottomstickybar}></div> */}
      {props.children}
    </React.Fragment>
  );
};

export default WorkplaceLayout;
