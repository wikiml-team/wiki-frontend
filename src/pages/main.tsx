import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <React.Fragment>
      <Link to='/workplace'>Workplace</Link>
    </React.Fragment>
  );
};

export default Main;
