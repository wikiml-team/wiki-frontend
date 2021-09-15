import { createSlice } from "@reduxjs/toolkit";
import IState from "models/state";

const HelpSlice = createSlice({
  name: "helpTooltips",
  initialState: true,
  reducers: {
    toggleHelp: (state: boolean) => {
      return !state;
    },
    setHelp: (state: boolean) => {
      return state = true;
    },
    removeHelp: (state: boolean) => {
      return state = false;
    },
  },
});

export const help = (state: IState) => state.helpTooltips;
export const { toggleHelp, setHelp, removeHelp } = HelpSlice.actions;

export default HelpSlice.reducer;
