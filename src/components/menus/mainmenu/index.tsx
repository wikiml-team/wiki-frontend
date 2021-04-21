import React from "react";
import { Redirect } from "react-router-dom";
import { Label } from "@fluentui/react";

import PivotBar, { PivotTabsProps } from "components/menus/mainmenu/pivotbar";
import TeamPile from "components/menus/mainmenu/teampile";

const tabs: PivotTabsProps[] = [
  {
    id: 1,
    header: "wikiml",
    icon: "WebComponents",
    render: <Redirect to="/" />,
  },
  {
    id: 2,
    header: "project",
    icon: "Page",
    render: <Label>Pivot #1</Label>,
    childtabs: [
      { id: 1, header: "general", icon: "Info" },
      {
        id: 2,
        header: "stakeholders",
        icon: "Commitments",
      },
      {
        id: 3,
        header: "logicmodel",
        icon: "LargeGrid",
      },
      {
        id: 4,
        header: "activitiesmatrix",
        icon: "GripperDotsVertical",
      },
      {
        id: 5,
        header: "performance",
        icon: "GripperDotsVertical",
      },
      {
        id: 6,
        header: "risks",
        icon: "DoubleDownArrow",
      },
      {
        id: 7,
        header: "budget",
        icon: "PaymentCard",
      },
      {
        id: 8,
        header: "reports",
        icon: "BarChart4",
      },
    ],
  },
  {
    id: 3,
    header: "methodology",
    icon: "StackIndicator",
    render: <Label>Pivot #2</Label>,
    childtabs: [
      { id: 1, header: "help", icon: "Info" },
      { id: 2, header: "tutorial", icon: "Info" },
      { id: 3, header: "info", icon: "Info" },
      { id: 4, header: "general", icon: "Info" },
    ],
  },
  {
    id: 4,
    header: "licitations",
    icon: "Library",
    render: <Label>Pivot #3</Label>,
    childtabs: [
      { id: 1, header: "l1", icon: "Info" },
      { id: 2, header: "l2", icon: "Info" },
      { id: 3, header: "l3", icon: "Info" },
      { id: 4, header: "l4", icon: "Info" },
    ],
  },
  {
    id: 5,
    header: "database",
    icon: "Database",
    render: <Label>Pivot #4</Label>,
    childtabs: [
      { id: 1, header: "d1", icon: "Info" },
      { id: 2, header: "d2", icon: "Info" },
      { id: 3, header: "d3", icon: "Info" },
      { id: 4, header: "d4", icon: "Info" },
    ],
  },
  {
    id: 6,
    header: "more",
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
