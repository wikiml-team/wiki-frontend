import main from "pages/main";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import WorkplaceLayout from "layouts/workplace";

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
      {/* <Route path="/workplace/project" render={(ProjectSwitcher} /> */}
      {/* <Route path="/workplace/methodology" render={MethodologySwitcher} /> */}
      {/* <Route path="/workplace/licitations" render={MethodologySwitcher} /> */}
      {/* <Route path="/workplace/database" render={MethodologySwitcher} /> */}
    </Switch>
  </WorkplaceLayout>
);
