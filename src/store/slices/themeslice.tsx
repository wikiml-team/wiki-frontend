import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPartialTheme, ITheme, loadTheme } from "@fluentui/react";
import {
  themeExcel,
  themeWord,
  themePowerPoint,
  themeTeams,
} from "themes/office";
import IState from "models/state";

const themeSlice = createSlice({
  name: "theme",
  initialState: themeWord,
  reducers: {
    setTheme: (state: ITheme, action: PayloadAction<string>) => {
      const { payload } = action;

      switch (payload) {
        case "word":
          state = themeWord;
          break;
        case "excel":
          state = themeExcel;
          break;
        case "powerpoint":
          state = themePowerPoint;
          break;
        case "teams":
          state = themeTeams;
          break;
      }
      loadTheme(state as IPartialTheme);
    },
    setThemeWord: (state: ITheme) => {
      state = themeWord;
      loadTheme(themeWord);
    },
    setThemeExcel: (state: ITheme) => {
      state = themeExcel;
      loadTheme(themeExcel);
    },
    setThemePowerPoint: (state: ITheme) => {
      state = themePowerPoint;
      loadTheme(themePowerPoint);
    },
    setThemeTeams: (state: ITheme) => {
      state = themeTeams;
      loadTheme(themeTeams);
    },
  },
});

export const selectCurrentTheme = (state: IState) => state.theme;
export const {
  setTheme,
  setThemeExcel,
  setThemePowerPoint,
  setThemeTeams,
  setThemeWord,
} = themeSlice.actions;

export default themeSlice.reducer;
