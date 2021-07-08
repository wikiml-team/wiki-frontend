import React from "react";

import PivotBar from "components/menus/mainmenu/pivotbar";
import TeamPile from "components/menus/mainmenu/teampile";
import { tabSchema } from "models/workplace";

type MenuProps = {
  tabs: tabSchema[];
}

export default function MainMenu(props: MenuProps) {
  return (
    <React.Fragment>
      <PivotBar tabs={props.tabs} />
      <TeamPile />
    </React.Fragment>
  );
}
