import { createSlice } from "@reduxjs/toolkit";
import IState from "models/state";
import i18n from "i18n";

const LanguageSlice = createSlice({
  name: "language",
  initialState: i18n.language,
  reducers: {
    setLanguage: (state, action) => {
      const { payload } = action;
      i18n.changeLanguage(payload);
      return (state = payload);
    },
    setEnglish: (state) => {
      i18n.changeLanguage(state);
      return (state = "en");
    },
    setSpanish: (state) => {
      i18n.changeLanguage(state);
      return (state = "es");
    },
    setGerman: (state) => {
      i18n.changeLanguage(state);
      return (state = "de");
    },
  },
});

export const selectLang = (state: IState) => state.language;
export const { setLanguage, setEnglish, setSpanish } = LanguageSlice.actions;

export default LanguageSlice.reducer;
