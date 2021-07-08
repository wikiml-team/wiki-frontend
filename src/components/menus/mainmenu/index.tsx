import React, { useState } from "react";
import { useTransition } from "react-spring";

import PivotBar from "components/menus/mainmenu/pivotbar";
import TeamPile from "components/menus/mainmenu/teampile";
import ToolBar from "./toolbar";
import { tabSchema } from "models/workplace";

type MenuProps = {
  tabs: tabSchema[];
}

export default function MainMenu(props: MenuProps) {

  // Tollbar Animation State & Controls
  const [fixToolBar, setFixToolBar] = useState(true)

  const [showToolBar, setShowToolBar] = useState(true)
  const toolBarTransition = useTransition(showToolBar, {
    from: { x: 0, y: -10, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 0, y: -10, opacity: 0 },
  })

  const handleToolbarOnClose = (item: any) => {
    setShowToolBar(false);
    setFixToolBar(false);
  }

  const handleToolbarOnFix = (item: any) => {
    setFixToolBar(true);
  }

  return (
    <React.Fragment>
      <PivotBar tabs={props.tabs} setShowToolBar={setShowToolBar} />
      <TeamPile />

      <ToolBar transition={toolBarTransition} isFixed={fixToolBar} handleOnClose={handleToolbarOnClose} handleOnFix={handleToolbarOnFix}>
        {/* {tab.render} */}
      </ToolBar>

    </React.Fragment>
  );
}
