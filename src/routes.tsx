import { lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "pages/main";

// Layouts
import WorkplaceLayout from "layouts/workplace";
import FileLayout from "layouts/file";
import SettingsLayout from "layouts/settings";
import MethodologyLayout from "layouts/methodology";

// Filemenu
const HomePage = lazy(() => import("pages/filemenu/home"));
const NewPage = lazy(() => import("pages/filemenu/new"));
const OpenPage = lazy(() => import("pages/filemenu/open"));
const InfoPage = lazy(() => import("pages/filemenu/info"));
const AboutPage = lazy(() => import("pages/filemenu/about"));
const SharePage = lazy(() => import("pages/filemenu/share"));
const PrintPage = lazy(() => import("pages/filemenu/print"));
const ExportPage = lazy(() => import("pages/filemenu/export"));
const MethodologiesPage = lazy(() => import("pages/filemenu/methodologies"));

// Settings
const Profile = lazy(() => import("pages/settings/profile"));
const Privacy = lazy(() => import("pages/settings/privacy"));
const Security = lazy(() => import("pages/settings/security"));
const Team = lazy(() => import("pages/settings/team"));

// Methodology Management
const MethodologyInfo = lazy(() => import("pages/methodology"));
const UpdateMethodology = lazy(() => import("pages/methodology/update"));
const DeleteMethodology = lazy(() => import("pages/methodology/delete"));
const CreateMethodology = lazy(() => import("pages/methodology/create"));

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
        <Route path="/methodology" render={MethodologyManagementSwitcher} />
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

// Methodology
const MethodologyManagementSwitcher = () => (
  /* Profile, Privacy, Security, Team */
  <MethodologyLayout>
    <Switch>
      {/* METHODOLOGY READ|EDIT */}
      {/* Update a feature */}
      <Route path="/methodology/:methodologyId/features/update/index" component={MethodologyInfo}/>
      
      <Route path="/methodology/:methodologyId/features/update/:form" component={UpdateMethodology} />
      {/* Create new feature */}
      <Route path="/methodology/:methodologyId/features/new/:form" component={DeleteMethodology} />
      {/* List all features */}
      <Route path="/methodology/:methodologyId/features/:form" component={MethodologyInfo} /> 

      {/* METHODOLOGY CREATE */}
      <Route path="/methodology/new/:methodologyId" component={CreateMethodology}/>
    </Switch>
  </MethodologyLayout>
);


