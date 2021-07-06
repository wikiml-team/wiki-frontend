import React from "react";

import PivotBar from "components/menus/mainmenu/pivotbar";
import TeamPile from "components/menus/mainmenu/teampile";
import { tabsConfiguration } from "pages/methodologies/canadian/maintabs";

const tabs = tabsConfiguration;

export default function MainMenu() {
  return (
    <React.Fragment>
      <PivotBar tabs={tabs} />
      <TeamPile />
    </React.Fragment>
  );
}
