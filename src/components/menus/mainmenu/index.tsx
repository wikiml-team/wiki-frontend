import React from "react";

import PivotBar from "components/menus/mainmenu/pivotbar";
import TeamPile from "components/menus/mainmenu/teampile";
import { TabScheema } from "models/workplace";

type MenuProps = {
  tabs: TabScheema;
  setShowToolBar: Function;
}

export default function MainMenu(props: MenuProps) {

  const { setShowToolBar, tabs } = props;

  return (
    <React.Fragment>
      <PivotBar scheema={tabs} setShowToolBar={setShowToolBar} />
      <TeamPile />
    </React.Fragment>
  );
}
