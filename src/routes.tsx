import { lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import WorkplaceLayout from "layouts/workplace";
import HomePage from "pages/home/home";
import FileLayout from "layouts/file";
import NewPage from "pages/home/new";
import OpenPage from "pages/home/open";
import InfoPage from "pages/home/info";
import AboutPage from "pages/home/about";
import SharePage from "pages/home/share";
import PrintPage from "pages/home/print";
import ExportPage from "pages/home/export";
import Main from "pages/main";
import MethodologiesPage from "pages/home/methodologies";
import Profile from "pages/settings/profile";
import Privacy from "pages/settings/privacy";
import Security from "pages/settings/security";
import Team from "pages/settings/team";
import SettingsLayout from "layouts/settings";

// Canaidan Methodology - Project Tab
const GeneralForm = lazy(() => import("pages/forms/canadian/projectforms/generalform"));
const StakeholdersForm = lazy(() => import("pages/forms/canadian/projectforms/stakeholdersform"));
const LogicModelForm = lazy(() => import("pages/forms/canadian/projectforms/logicmodelform"));
const ActivitiesMatrixForm = lazy(() => import("pages/forms/canadian/projectforms/activitiesform"));
const PerformanceMeasureForm = lazy(() => import("pages/forms/canadian/projectforms/performanceform"));
const RisksForm = lazy(() => import("pages/forms/canadian/projectforms/risksform"));
const BudgetForm = lazy(() => import("pages/forms/canadian/projectforms/budgetform"));
const ReportsForm = lazy(() => import("pages/forms/canadian/projectforms/reportsform"));

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/main" component={Main} />
        <Route path="/settings" render={SettingsSwitcher} />
        <Route path="/workplace" render={WorkplaceSwitcher} />
        <Route path="/" render={MainSwitcher} />
      </Switch>
    </Router>
  );
}

// SETTINGS
const SettingsSwitcher = () => (
  /* Profile, Privacy, Security, Team */
  <SettingsLayout>
    <Switch>
      <Route path="/settings/profile" component={Profile} />
      <Route path="/settings/privacy" component={Privacy} />
      <Route path="/settings/security" component={Security} />
      <Route path="/settings/team" component={Team} />
    </Switch>
  </SettingsLayout>
);

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
    <Route path="/workplace/:projectId/general" component={GeneralForm} />
    <Route path="/workplace/:projectId/stakeholdres" component={StakeholdersForm} />
    <Route path="/workplace/:projectId/logicmodel" component={LogicModelForm} />
    <Route path="/workplace/:projectId/activitiesmatrix" component={ActivitiesMatrixForm} />
    <Route path="/workplace/:projectId/performance" component={PerformanceMeasureForm} />
    <Route path="/workplace/:projectId/risks" component={RisksForm} />
    <Route path="/workplace/:projectId/budget" component={BudgetForm} />
    <Route path="/workplace/:projectId/reports" component={ReportsForm} />
  </Switch>
);

// HOME
const MainSwitcher = () => (
  // Home, New, Open
  <FileLayout>
    <Switch>
      <Route path="/new" component={NewPage} />
      <Route path="/open" component={OpenPage} />
      <Route path="/methodologies" component={MethodologiesPage} />
      <Route path="/:fileId" render={FileSwitcher} />
      <Route path="/" component={HomePage} />
    </Switch>

  </FileLayout>
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


