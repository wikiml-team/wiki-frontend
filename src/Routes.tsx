import { lazy } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import WorkplaceLayout from "layouts/workplace";
import MainLayout from "layouts/main";
import Main from "pages/main";

// Canaidan Methodology - Project Tab
const GeneralForm = lazy(
  () => import("pages/methodologies/canadian/projectforms/generalform")
);
const StakeholdersForm = lazy(
  () => import("pages/methodologies/canadian/projectforms/stakeholdersform")
);
const LogicModelForm = lazy(
  () => import("pages/methodologies/canadian/projectforms/logicmodelform")
);
const ActivitiesMatrixForm = lazy(
  () => import("pages/methodologies/canadian/projectforms/activitiesform")
);
const PerformanceMeasureForm = lazy(
  () => import("pages/methodologies/canadian/projectforms/performanceform")
);
const RisksForm = lazy(
  () => import("pages/methodologies/canadian/projectforms/risksform")
);
const BudgetForm = lazy(
  () => import("pages/methodologies/canadian/projectforms/budgetform")
);
const ReportsForm = lazy(
  () => import("pages/methodologies/canadian/projectforms/reportsform")
);

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path='/workplace' render={WorkplaceSwitcher} />
        <Route path='/' render={MainSwitcher} />
      </Switch>
    </Router>
  );
}

const MainSwitcher = () => {
  return (
    <MainLayout>
      <Switch>
        <Route path='/' component={Main} />
      </Switch>
    </MainLayout>
  );
};

const WorkplaceSwitcher = () => (
  /* Projects, Methodologies, Licitaciones, Bases de Datos */
  <WorkplaceLayout>
    <Switch>
      <Route path='/workplace/project' render={ProjectSwitcher} />
      {/* <Route path="/workplace/methodology" render={MethodologySwitcher} /> */}
      {/* <Route path="/workplace/licitations" render={MethodologySwitcher} /> */}
      {/* <Route path="/workplace/database" render={MethodologySwitcher} /> */}
    </Switch>
  </WorkplaceLayout>
);

const ProjectSwitcher = () => (
  /* Projects */
  // After having users account and project id the url's format should be /workplace/#project_id/project/canadian/general
  <Switch>
    <Route path='/workplace/project/canadian/general' component={GeneralForm} />
    <Route
      path='/workplace/project/canadian/stakeholdres'
      component={StakeholdersForm}
    />
    <Route
      path='/workplace/project/canadian/logicmodel'
      component={LogicModelForm}
    />
    <Route
      path='/workplace/project/canadian/activitiesmatrix'
      component={ActivitiesMatrixForm}
    />
    <Route
      path='/workplace/project/canadian/performance'
      component={PerformanceMeasureForm}
    />
    <Route path='/workplace/project/canadian/risks' component={RisksForm} />
    <Route path='/workplace/project/canadian/budget' component={BudgetForm} />
    <Route path='/workplace/project/canadian/reports' component={ReportsForm} />
  </Switch>
);
