import React, { FunctionComponent } from "react";
// import { mergeStyleSets } from "@fluentui/react";

import CommandMenu from "components/menus/commands/";
import MainMenu from "components/menus/mainmenu";

// const classes = mergeStyleSets({
//   topstickybar: {
//     width: "100%",
//     position: "fixed",
//     top: 0,
//     zIndex: 999,
//   },
//   bottomstickybar: {
//     width: "100%",
//     position: "fixed",
//     top: 0,
//     zIndex: 999,
//   },
// });

const WorkplaceLayout: FunctionComponent = (props) => {
  return (
    <React.Fragment>
      {/* <Stack data-test="workplace-div" className={classes.topstickybar}> */}
      <CommandMenu />
      <MainMenu />
      {/* </Stack> */}
      {/* <div className={classes.bottomstickybar}></div> */}
      {props.children}
    </React.Fragment>
  );
};

export default WorkplaceLayout;
