
import { Redirect } from "react-router";
import { Label } from "@fluentui/react";

// PROJECT FORMS
import GeneralForm from "pages/methodologies/canadian/projectforms/generalform";
import StakeholdersForm from "pages/methodologies/canadian/projectforms/stakeholdersform";
import LogicModelForm from "pages/methodologies/canadian/projectforms/logicmodelform";
import ActivitiesMatrixForm from "pages/methodologies/canadian/projectforms/activitiesform";
import PerformanceMeasureForm from "pages/methodologies/canadian/projectforms/performanceform";
import RisksForm from "pages/methodologies/canadian/projectforms/risksform";
import BudgetForm from "pages/methodologies/canadian/projectforms/budgetform";
import ReportsForm from "pages/methodologies/canadian/projectforms/reportsform";
import ChangeNarrativeForm from "pages/methodologies/canadian/projectforms/changenarrativeform";

// LICITATION FORMS
import LotForm from "pages/methodologies/canadian/licitationforms/lotform";
import SpecificationsForm from "pages/methodologies/canadian/licitationforms/specificationsform";
import TechnicalOfferForm from "pages/methodologies/canadian/licitationforms/technicalofferform";
import FinancialOfferForm from "pages/methodologies/canadian/licitationforms/financialofferform";

// TUTORIALS
import FormsTutorials from "pages/methodologies/canadian/tutorials/formstutorial";
import SectorsTutorials from "pages/methodologies/canadian/tutorials/sectorstutorial";
import GuidesTutorials from "pages/methodologies/canadian/tutorials/guidestutorial";
import Tutorials from "pages/methodologies/canadian/tutorials/methodologytutorials";
import OutcomesTutorial from "pages/methodologies/canadian/tutorials/outcomestutorial";
import IndicatorsTutorial from "pages/methodologies/canadian/tutorials/indicatorstutorial";
import FinancingForm from "pages/methodologies/canadian/tutorials/indicatorstutorial";

// DATABASE
import ActivitiesData from "./database/activitiesdata";
import BudgetsData from "./database/budgetsdata";
import CategoriesData from "./database/categoriesdata";
import CoinsData from "./database/coinsdata";
import CountriesData from "./database/countriesdata";
import DevelopmentGoalsData from "./database/developmentgoalsdata";
import IndicatorsData from "./database/indicatorsdata";
import LanguagesData from "./database/languagesdata";
import MethodologiesData from "./database/methodologiesdata";
import OffersData from "./database/offersdata";
import OutcomesData from "./database/outcomesdata";
import ProductsServicesData from "./database/productsservicesdata";
import ProgramsData from "./database/programsdata";
import ProjectGoalsData from "./database/projectgoalsdata";
import ProjectsData from "./database/projectsdata";
import SectorsData from "./database/sectorsdata";
import SourcesData from "./database/sourcesdata";
import StakeholdersData from "./database/stakeholdersdata";
import AssumptionsData from "./database/assumptionsdata";
import UsersData from "./database/usersdata";

import { TabSchema } from "models/workplace";
import EvaluationForm from "./projectforms/evaluationform";
import ApplicationForm from "./projectforms/applicationform";

const tabsConfiguration = new TabSchema([
  {
    key: "key1",
    name: "wikiml",
    icon: "WebComponents",
    render: <Redirect to="/" />,
    // toolBar: 
  },
  {
    key: "key2",
    name: "project",
    icon: "Page",
    render: <Label>ToolBar #1</Label>,
    addtabs: true,
    childtabs: [
      {
        key: "key1",
        name: "general",
        icon: "Info",
        render: <GeneralForm />
      },
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
        key: "key9",
        name: "financing",
        icon: "People",
        render: <FinancingForm />,
      },
      {
        key: "key10",
        name: "application",
        icon: "GripperDotsVertical",
        render: <ApplicationForm />,
      },
      {
        key: "key11",
        name: "reports",
        icon: "ChartSeries",
        render: <ReportsForm />,
      },
      {
        key: "key12",
        name: "evaluations",
        icon: "AreaChart",
        render: <EvaluationForm />,
      },
    ],
  },
  {
    key: "key3",
    name: "licitations",
    icon: "Library",
    render: <Label>ToolBar #2</Label>,
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
        name: "technical-offer",
        icon: "PageListSolid",
        render: <TechnicalOfferForm />,
      },
      {
        key: "key4",
        name: "financial-offer",
        icon: "Financial",
        render: <FinancialOfferForm />,
      },
    ],
  },
  {
    key: "key4",
    name: "methodology",
    icon: "StackIndicator",
    render: <Label>ToolBar #3</Label>,
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
    render: <Label>ToolBar #4</Label>,
    childtabs: [
      {
        key: "key1",
        name: "activities",
        icon: "Database",
        render: <ActivitiesData/>,
      },
      {
        key: "key2",
        name: "budgets",
        icon: "Database",
        render: <BudgetsData/>,
      },
      {
        key: "key3",
        name: "categories",
        icon: "Database",
        render: <CategoriesData/>,
      },
      {
        key: "key4",
        name: "coins",
        icon: "Database",
        render: <CoinsData/>,
      },
      {
        key: "key5",
        name: "countries",
        icon: "Database",
        render: <CountriesData/>,
      },
      {
        key: "key6",
        name: "developmentgoals",
        icon: "Database",
        render: <DevelopmentGoalsData/>,
      },
      {
        key: "key7",
        name: "indicators",
        icon: "Database",
        render: <IndicatorsData/>,
      },
      {
        key: "key8",
        name: "languages",
        icon: "Database",
        render: <LanguagesData/>,
      },
      {
        key: "key9",
        name: "methodologies",
        icon: "Database",
        render: <MethodologiesData/>,
      },
      {
        key: "key10",
        name: "offers",
        icon: "Database",
        render: <OffersData/>,
      },
      {
        key: "key11",
        name: "outcomes",
        icon: "Database",
        render: <OutcomesData/>,
      },
      {
        key: "key12",
        name: "productsservices",
        icon: "Database",
        render: <ProductsServicesData/>,
      },
      {
        key: "key13",
        name: "programs",
        icon: "Database",
        render: <ProgramsData/>,
      },
      {
        key: "key14",
        name: "projectgoals",
        icon: "Database",
        render: <ProjectGoalsData/>,
      },
      {
        key: "key15",
        name: "projects",
        icon: "Database",
        render: <ProjectsData/>,
      },
      {
        key: "key16",
        name: "sectors",
        icon: "Database",
        render: <SectorsData/>,
      },
      {
        key: "key17",
        name: "sources",
        icon: "Database",
        render: <SourcesData/>,
      },
      {
        key: "key18",
        name: "stakeholders",
        icon: "Database",
        render: <StakeholdersData/>,
      },
      {
        key: "key19",
        name: "assumptions",
        icon: "Database",
        render: <AssumptionsData/>,
      },
      {
        key: "key20",
        name: "users",
        icon: "Database",
        render: <UsersData/>,
      },
    ],
  },
  {
    key: "key6",
    name: "more",
    icon: "MoreVertical",
    render: <Label>ToolBar #5</Label>,
  },
]);

export default tabsConfiguration;