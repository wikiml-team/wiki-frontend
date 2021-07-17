import React from "react";

import PivotBar from "components/menus/mainmenu/pivotbar";
import TeamPile from "components/menus/mainmenu/teampile";
import { TabSchema } from "models/workplace";

type MenuProps = {
  tabs: TabSchema;
  setShowToolBar: Function;
}

export default function MainMenu(props: MenuProps) {

  const { setShowToolBar, tabs } = props;

  return (
    <React.Fragment>
      <PivotBar schema={tabs} setShowToolBar={setShowToolBar} />
      <TeamPile />
    </React.Fragment>
  );
}
