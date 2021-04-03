import { loadTheme } from "@fluentui/react";
import { createSlice } from "@reduxjs/toolkit";
import { themeExcel, themeWord, themePowerPoint, themeTeams } from "themes";
import IState from "models/state";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: themeWord,
  },
  reducers: {
    setWord: (state) => {
      state.value = themeWord;
      loadTheme(themeWord);
    },
    setExcel: (state) => {
      state.value = themeExcel;
      loadTheme(themeExcel);
    },
    setPowerPoint: (state) => {
      state.value = themePowerPoint;
      loadTheme(themePowerPoint);
    },
    setTeams: (state) => {
      state.value = themeTeams;
      loadTheme(themeTeams);
    },
  },
});

export const theme = (state: IState) => state.theme.value;
export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
