import { Redirect } from "react-router";
import { Label } from "@fluentui/react";

import GeneralForm from "pages/methodologies/canadian/projectforms/generalform";
import StakeholdersForm from "pages/methodologies/canadian/projectforms/stakeholdersform";
import LogicModelForm from "pages/methodologies/canadian/projectforms/logicmodelform";
import ActivitiesMatrixForm from "pages/methodologies/canadian/projectforms/activitiesform";
import PerformanceMeasureForm from "pages/methodologies/canadian/projectforms/performanceform";
import RisksForm from "pages/methodologies/canadian/projectforms/risksform";
import BudgetForm from "pages/methodologies/canadian/projectforms/budgetform";
import ReportsForm from "pages/methodologies/canadian/projectforms/reportsform";

import LotForm from "pages/methodologies/canadian/licitationforms/lotform";
import SpecificationsForm from "pages/methodologies/canadian/licitationforms/specificationsform";
import TechnicalOfferForm from "pages/methodologies/canadian/licitationforms/technicalofferform";
import FinancialOfferForm from "pages/methodologies/canadian/licitationforms/financialofferform";
import FormsTutorials from "pages/methodologies/canadian/tutorials/formstutorial";
import SectorsTutorials from "pages/methodologies/canadian/tutorials/sectorstutorial";
import GuidesTutorials from "pages/methodologies/canadian/tutorials/guidestutorial";
import Tutorials from "pages/methodologies/canadian/tutorials/methodologytutorials";
import OutcomesTutorial from "pages/methodologies/canadian/tutorials/outcomestutorial";
import IndicatorsTutorial from "pages/methodologies/canadian/tutorials/indicatorstutorial";

export type PivotTabs = {
  key: string;
  name: string;
  icon: string;
  render: JSX.Element;
  addtabs?: boolean;
  childtabs?: FormTabs[];
  url?: string;
};

export type FormTabs = {
  key: string;
  name: string;
  icon: string;
  url?: string;
};

export const tabsConfiguration: PivotTabs[] = [
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
      { key: "key1", name: "general", icon: "Info", url: "/workplace/project/canadian/general" },
      {
        key: "key2",
        name: "stakeholders",
        icon: "Commitments",
        url: "/workplace/project/canadian/stakeholdres"
      },
      {
        key: "key3",
        name: "logicmodel",
        icon: "LargeGrid",
        url: "/workplace/project/canadian/logicmodel"
      },
      {
        key: "key4",
        name: "activitiesmatrix",
        icon: "GripperDotsVertical",
        url: "/workplace/project/canadian/activitiesmatrix"
      },
      {
        key: "key5",
        name: "performance",
        icon: "GripperDotsVertical",
        url: "/workplace/project/canadian/performance"
      },
      {
        key: "key6",
        name: "risks",
        icon: "DoubleDownArrow",
        url: "/workplace/project/canadian/risks"
      },
      {
        key: "key7",
        name: "budget",
        icon: "PaymentCard",
        url: "/workplace/project/canadian/budget"
      },
      {
        key: "key8",
        name: "reports",
        icon: "BarChart4",
        url: "/workplace/project/canadian/reports"
      },
    ],
  },
  {
    key: "key3",
    name: "licitations",
    icon: "Library",
    render: <Label>Pivot #2</Label>,
    childtabs: [
      { key: "key1", name: "lot", icon: "OEM", url: "<LotForm /" },
      {
        key: "key2",
        name: "specifications",
        icon: "PageList",
        url: "<SpecificationsForm />"
      },
      {
        key: "key3",
        name: "tecoffer",
        icon: "PageListSolid",
        url: "<TechnicalOfferForm />"
      },
      {
        key: "key4",
        name: "finoffer",
        icon: "Financial",
        url: "<FinancialOfferForm />"
      },
    ],
  },
  {
    key: "key4",
    name: "methodology",
    icon: "StackIndicator",
    render: <Label>Pivot #3</Label>,
    childtabs: [
      {
        key: "key1",
        name: "forms",
        icon: "PageData",
        url: "<FormsTutorials />"
      },
      {
        key: "key2",
        name: "sectors",
        icon: "Sections",
        url: "<SectorsTutorials />"
      },
      {
        key: "key3",
        name: "guides",
        icon: "GUID",
        url: "<GuidesTutorials />"
      },
      {
        key: "key4",
        name: "tutorials",
        icon: "Video",
        url: "<Tutorials />"
      },
      {
        key: "key5",
        name: "outcomes",
        icon: "ReportDocument",
        url: "<OutcomesTutorial />"
      },
      {
        key: "key6",
        name: "indicators",
        icon: "CRMReport",
        url: "<IndicatorsTutorial />"
      },
    ],
  },
  {
    key: "key5",
    name: "database",
    icon: "Database",
    render: <Label>Pivot #4</Label>,
  },
  {
    key: "key6",
    name: "more",
    icon: "MoreVertical",
    render: <Label>Pivot #5</Label>,
  },
];
