import { Redirect } from "react-router";
import { Label } from "@fluentui/react";

export type PivotTabs = {
  key: string;
  name: string;
  icon: string;
  render?: JSX.Element;
  addtabs?: boolean;
  childtabs?: PivotTabs[];
  onClick?: Function;
};

export const maintabs: PivotTabs[] = [
  {
    key: "key1",
    name: "wikiml",
    icon: "WebComponents",
    render: <Redirect to="/" />,
  },
  {
    key: "key2",
    name: "project",
    icon: "Page",
    render: <Label>Pivot #1</Label>,
    addtabs: true,
    childtabs: [
      { key: "key1", name: "general", icon: "Info" },
      {
        key: "key2",
        name: "stakeholders",
        icon: "Commitments",
      },
      {
        key: "key3",
        name: "logicmodel",
        icon: "LargeGrid",
      },
      {
        key: "key4",
        name: "activitiesmatrix",
        icon: "GripperDotsVertical",
      },
      {
        key: "key5",
        name: "performance",
        icon: "GripperDotsVertical",
      },
      {
        key: "key6",
        name: "risks",
        icon: "DoubleDownArrow",
      },
      {
        key: "key7",
        name: "budget",
        icon: "PaymentCard",
      },
      {
        key: "key8",
        name: "reports",
        icon: "BarChart4",
      },
    ],
  },
  {
    key: "key3",
    name: "methodology",
    icon: "StackIndicator",
    render: <Label>Pivot #2</Label>,
    childtabs: [
      { key: "key1", name: "help", icon: "Info" },
      { key: "key2", name: "tutorial", icon: "Info" },
      { key: "key3", name: "info", icon: "Info" },
      { key: "key4", name: "general", icon: "Info" },
    ],
  },
  {
    key: "key4",
    name: "licitations",
    icon: "Library",
    render: <Label>Pivot #3</Label>,
    childtabs: [
      { key: "key1", name: "lot", icon: "OEM" },
      { key: "key2", name: "specifications", icon: "PageList" },
      { key: "key3", name: "tecoffer", icon: "PageListSolid" },
      { key: "key4", name: "finoffer", icon: "FinancialSolid" },
    ],
  },
  {
    key: "key5",
    name: "database",
    icon: "Database",
    render: <Label>Pivot #4</Label>,
    childtabs: [
      { key: "key1", name: "d1", icon: "Info" },
      { key: "key2", name: "d2", icon: "Info" },
      { key: "key3", name: "d3", icon: "Info" },
      { key: "key4", name: "d4", icon: "Info" },
    ],
  },
  {
    key: "key6",
    name: "more",
    icon: "MoreVertical",
    render: <Label>Pivot #4</Label>,
    childtabs: [
      { key: "key1", name: "m1", icon: "Info" },
      { key: "key2", name: "m2", icon: "Info" },
      { key: "key3", name: "m3", icon: "Info" },
      { key: "key4", name: "m4", icon: "Info" },
    ],
  },
];
