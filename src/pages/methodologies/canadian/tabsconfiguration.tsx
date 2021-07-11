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
import ChangeNarrativeForm from "pages/methodologies/canadian/projectforms/changenarrativeform";

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
import { tabSchema } from "models/workplace";

const tabsConfiguration: tabSchema[] = [
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
      { key: "key1", name: "general", icon: "Info", render: <GeneralForm /> },
      {
        key: "key2",
        name: "stakeholders",
        icon: "Commitments",
        render: <StakeholdersForm />,
      },
      {
        key: "key3",
        name: "logicmodel",
        icon: "LargeGrid",
        render: <LogicModelForm />,
      },
      {
        key: "key4",
        name: "activitiesmatrix",
        icon: "GripperDotsVertical",
        render: <ActivitiesMatrixForm />,
      },
      {
        key: "key5",
        name: "performance",
        icon: "GripperDotsVertical",
        render: <PerformanceMeasureForm />,
      },
      {
        key: "key6",
        name: "changenarrative",
        icon: "GripperDotsVertical",
        render: <ChangeNarrativeForm />,
      },
      {
        key: "key7",
        name: "risks",
        icon: "DoubleDownArrow",
        render: <RisksForm />,
      },
      {
        key: "key8",
        name: "budget",
        icon: "PaymentCard",
        render: <BudgetForm />,
      },
      {
        key: "key8",
        name: "reports",
        icon: "BarChart4",
        render: <ReportsForm />,
      },
    ],
  },
  {
    key: "key3",
    name: "licitations",
    icon: "Library",
    render: <Label>Pivot #2</Label>,
    childtabs: [
      { key: "key1", name: "lot", icon: "OEM", render: <LotForm /> },
      {
        key: "key2",
        name: "specifications",
        icon: "PageList",
        render: <SpecificationsForm />,
      },
      {
        key: "key3",
        name: "tecoffer",
        icon: "PageListSolid",
        render: <TechnicalOfferForm />,
      },
      {
        key: "key4",
        name: "finoffer",
        icon: "Financial",
        render: <FinancialOfferForm />,
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
        render: <FormsTutorials />,
      },
      {
        key: "key2",
        name: "sectors",
        icon: "Sections",
        render: <SectorsTutorials />,
      },
      {
        key: "key3",
        name: "guides",
        icon: "GUID",
        render: <GuidesTutorials />,
      },
      {
        key: "key4",
        name: "tutorials",
        icon: "Video",
        render: <Tutorials />,
      },
      {
        key: "key5",
        name: "outcomes",
        icon: "ReportDocument",
        render: <OutcomesTutorial />,
      },
      {
        key: "key6",
        name: "indicators",
        icon: "CRMReport",
        render: <IndicatorsTutorial />,
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

export default tabsConfiguration;