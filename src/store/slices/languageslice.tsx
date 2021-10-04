import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IState from "models/state";
import i18n from "i18n";

const LanguageSlice = createSlice({
  name: "language",
  initialState: i18n.language,
  reducers: {
    setLanguage: (state: string, action: PayloadAction<string>) => {
      const { payload } = action;
      i18n.changeLanguage(payload);
      return state = payload;
    },
    setEnglish: (state: string) => {
      state = "en";
      i18n.changeLanguage(state);
    },
    setSpanish: (state: string) => {
      state = "es";
      i18n.changeLanguage(state);
    },
    setGerman: (state: string) => {
      state = "de";
      i18n.changeLanguage(state);
    },
    setItalian: (state: string) => {
      state = "it";
      i18n.changeLanguage(state);
    },
  },
});

export const selectLanguage = (state: IState) => state.language;
export const { setLanguage, setEnglish, setSpanish } = LanguageSlice.actions;

export default LanguageSlice.reducer;
