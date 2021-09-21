import React, { FunctionComponent } from "react";
import Apollo from "apollo";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

// import { AutoSavingForm2 } from "./autosave"

const Main : FunctionComponent = (props) => {

  return <React.Fragment>
      <Link to="/workplace">Workplace</Link>
      {/* <AutoSavingForm2 /> */}

      <Apollo/>
    </React.Fragment>
}

export default Main
