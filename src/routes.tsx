import { lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import WorkplaceLayout from "layouts/workplace";
import HomePage from "pages/home/home";
import MainLayout from "layouts/main";
import NewPage from "pages/home/new";
import OpenPage from "pages/home/open";
import InfoPage from "pages/home/info";
import AboutPage from "pages/home/about";
import SharePage from "pages/home/share";
import PrintPage from "pages/home/print";
import ExportPage from "pages/home/export";
import Main from "pages/main";

// Canaidan Methodology - Project Tab
const GeneralForm = lazy(() => import("pages/methodologies/canadian/projectforms/generalform"));
const StakeholdersForm = lazy(() => import("pages/methodologies/canadian/projectforms/stakeholdersform"));
const LogicModelForm = lazy(() => import("pages/methodologies/canadian/projectforms/logicmodelform"));
const ActivitiesMatrixForm = lazy(() => import("pages/methodologies/canadian/projectforms/activitiesform"));
const PerformanceMeasureForm = lazy(() => import("pages/methodologies/canadian/projectforms/performanceform"));
const RisksForm = lazy(() => import("pages/methodologies/canadian/projectforms/risksform"));
const BudgetForm = lazy(() => import("pages/methodologies/canadian/projectforms/budgetform"));
const ReportsForm = lazy(() => import("pages/methodologies/canadian/projectforms/reportsform"));

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/main" component={Main} />
        <Route path="/workplace" render={WorkplaceSwitcher} />
        <Route path="/" render={MainSwitcher} />
      </Switch>
    </Router>
  );
}

// WORKPLACE
const WorkplaceSwitcher = () => (
  /* Projects, Methodologies, Licitaciones, Bases de Datos */
  <WorkplaceLayout>
    <Switch>
      <Route path="/workplace/project" render={ProjectSwitcher} />
      {/* <Route path="/workplace/methodology" render={MethodologySwitcher} /> */}
      {/* <Route path="/workplace/licitations" render={MethodologySwitcher} /> */}
      {/* <Route path="/workplace/database" render={MethodologySwitcher} /> */}
    </Switch>
  </WorkplaceLayout>
);

// PROJECT
const ProjectSwitcher = () => (
  // After having users account and project id the url's format should be /workplace/#project_id/general
  <Switch>
    <Route path="/workplace/{p_id}/general" component={GeneralForm} />
    <Route path="/workplace/{p_id}/stakeholdres" component={StakeholdersForm} />
    <Route path="/workplace/{p_id}/logicmodel" component={LogicModelForm} />
    <Route path="/workplace/{p_id}/activitiesmatrix" component={ActivitiesMatrixForm} />
    <Route path="/workplace/{p_id}/performance" component={PerformanceMeasureForm} />
    <Route path="/workplace/{p_id}/risks" component={RisksForm} />
    <Route path="/workplace/{p_id}/budget" component={BudgetForm} />
    <Route path="/workplace/{p_id}/reports" component={ReportsForm} />
  </Switch>
);

// HOME
const MainSwitcher = () => (
  // Home, New, Open
  <MainLayout>
    <Switch>
      <Route path="/new" component={NewPage} />
      <Route path="/open" component={OpenPage} />
      <Route path="/:fileId" render={FileSwitcher} />
      <Route path="/" component={HomePage} />
    </Switch>

  </MainLayout>
);

const FileSwitcher = () => (
  // Info, Export, Print, Share, About
  <Switch>
      <Route path="/:fileId/info" component={InfoPage} />
      <Route path="/:fileId/export" component={ExportPage} />
      <Route path="/:fileId/print" component={PrintPage} />
      <Route path="/:fileId/share" component={SharePage} />
      <Route path="/:fileId/about" component={AboutPage} />
  </Switch>
)


