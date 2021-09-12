import { lazy } from "react";
import main from "pages/main";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import WorkplaceLayout from "layouts/workplace";

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
        <Route path="/workplace" render={WorkplaceSwitcher} />
        <Route path="/" render={main} />
      </Switch>
    </Router>
  );
}

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

const ProjectSwitcher = () => (
  /* Projects */
  // After having users account and project id the url's format should be /workplace/#project_id/project/canadian/general
  <Switch>
    <Route path="/workplace/project/general" component={GeneralForm} />
    <Route path="/workplace/project/stakeholdres" component={StakeholdersForm} />
    <Route path="/workplace/project/logicmodel" component={LogicModelForm} />
    <Route path="/workplace/project/activitiesmatrix" component={ActivitiesMatrixForm} />
    <Route path="/workplace/project/performance" component={PerformanceMeasureForm} />
    <Route path="/workplace/project/risks" component={RisksForm} />
    <Route path="/workplace/project/budget" component={BudgetForm} />
    <Route path="/workplace/project/reports" component={ReportsForm} />
  </Switch>
);
