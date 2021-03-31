import { createSlice } from "@reduxjs/toolkit";
import IState from "models/state";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: "default",
  },
  reducers: {
    setRed: (state) => {
      state.value = "red";
    },
    setCyan: (state) => {
      state.value = "cyan";
    },
    setDefault: (state) => {
      state.value = "default";
    },
  },
});

export const theme = (state: IState) => state.theme.value;
export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
