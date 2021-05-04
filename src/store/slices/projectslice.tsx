import { createSlice } from "@reduxjs/toolkit";
import IProject, { Sector } from "models/project";
import IState from "models/state";

const initialState: IProject = {
  name: "Project Name Test",
  shortname: "PN Test",
  methodology: "Canadian Test",
  status: "pendant",
  wikicode: "X54S0",
  organization: "Organization Test",
  duration: "Duration test",
  country: "Country Test",
  program: "Program Test",
  sector: Sector.Energy,
  doner: "Doner Test",
  leader: { name: "Leader Test", email: "test@gmail.com" },
  team: [
    { name: "team1", email: "team-test@gmal.com" },
    { name: "team2", email: "team-test@gmal.com" },
  ],
  currency: "euro",
  budget: "2",
  budgetItems: "BudgetItem Test",
  budgetAct: "Budget Act Test",
  description: "Lorem ipsum dolre description asedore son lisiu tredo.",
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setCurrentProject: (state, action) => {
      state = action.payload;
    },
  },
});

export const selecCurrentProject = (state: IState) => state.currentProject;
export const { setCurrentProject } = projectSlice.actions;

export default projectSlice.reducer;
