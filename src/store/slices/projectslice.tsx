import { createSlice } from "@reduxjs/toolkit";
import IProject, { Sector } from "models/project";
import IState from "models/state";

const initialState: IProject = {
  name: "Large Project Name Test",
  shortname: "Short Project Name",
  description: "Lorem ipsum dolre description asedore son lisiu tredo.",
  methodology: "Canadian Test",
  status: "pending",
  wikicode: "X54S0",
  organization: "Organization Test",
  intermediary: "Intermediary Organization Test",
  duration: 34,
  country: "Country Test",
  program: "Program Test",
  sector: Sector.Energy,
  donorcode: "2F8HT",
  leader: { name: "Leader Test", email: "test@gmail.com" },
  team: [
    { name: "team1", email: "team-test@gmal.com" },
    { name: "team2", email: "team-test@gmal.com" },
  ],
  currency: "Euro",
  budget: 200.00,
  budgetItems: 22.00,
  budgetAct: 33.00,
  budgetFinanced: 150.00,
  solicitedBudget: 44.00,
  approvedBudget: 44.00,
  approvedDate: new Date(),
  finalDate: new Date(),
  initialDate: new Date(),
  donor: "Donor Test",
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

export const selectProject = (state: IState) => state.project;
export const { setCurrentProject } = projectSlice.actions;

export default projectSlice.reducer;
