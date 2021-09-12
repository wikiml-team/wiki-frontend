import React from "react";
import { Link } from "react-router-dom";
import { AutoSavingForm2 } from "./autosave"

export default function Main() {
  return (
    <React.Fragment>
      <Link to="/workplace">Workplace</Link>
      <AutoSavingForm2 />

    </React.Fragment>
  );
}