import { createSlice } from "@reduxjs/toolkit";
import IState from "models/state";

const HelpSlice = createSlice({
  name: "helpTooltips",
  initialState: true,
  reducers: {
    toggleHelp: (state: boolean) => {
      return !state;
    },
    activateHelp: (state: boolean) => {
      return (state = true);
    },
    deactivateHelp: (state: boolean) => {
      return (state = false);
    },
  },
});

export const help = (state: IState) => state.helpTooltips;
export const { toggleHelp, activateHelp, deactivateHelp } = HelpSlice.actions;

export default HelpSlice.reducer;
