import React from "react";
import { Redirect } from "react-router-dom";
import { Label } from "@fluentui/react";

import PivotBar, { PivotTabsProps } from "components/menus/mainmenu/pivotbar";
import TeamPile from "components/menus/mainmenu/teampile";

const tabs: PivotTabsProps[] = [
  {
    id: 1,
    header: "WikiML",
    icon: "WebComponents",
    render: <Redirect to="/" />,
  },
  { id: 2, header: "Project", icon: "Page", render: <Label>Pivot #1</Label> },
  {
    id: 3,
    header: "Methodology",
    icon: "StackIndicator",
    render: <Label>Pivot #2</Label>,
  },
  {
    id: 4,
    header: "Licitations",
    icon: "Library",
    render: <Label>Pivot #3</Label>,
  },
  {
    id: 5,
    header: "Database",
    icon: "Database",
    render: <Label>Pivot #4</Label>,
  },
  {
    id: 6,
    header: "More",
    icon: "MoreVertical",
    render: <Label>Pivot #4</Label>,
  },
];

export default function MainMenu() {
  return (
    <React.Fragment>
      <PivotBar tabs={tabs} />
      <TeamPile />
    </React.Fragment>
  );
}