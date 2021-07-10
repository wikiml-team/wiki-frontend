import React from "react";

import PivotBar from "components/menus/mainmenu/pivotbar";
import TeamPile from "components/menus/mainmenu/teampile";
import { tabSchema } from "models/workplace";

type MenuProps = {
  tabs: tabSchema[];
  setShowToolBar: Function;
}

export default function MainMenu(props: MenuProps) {

  const { setShowToolBar } = props;

  return (
    <React.Fragment>
      <PivotBar tabs={props.tabs} setShowToolBar={setShowToolBar} />
      <TeamPile />
    </React.Fragment>
  );
}
