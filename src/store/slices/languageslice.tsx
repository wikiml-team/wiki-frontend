import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "i18n";

import IState from "models/state";
import ILanguageSetting from "models/languagesetting"

const LanguageSlice = createSlice({
  name: "language",
  initialState: {
    current: i18n.language,
    supported: ["en", "es", "de", "it"]
  },
  reducers: {
    setLanguage: (state: ILanguageSetting, action: PayloadAction<string>) => {
      const { payload } = action;
      i18n.changeLanguage(payload);
      return state = {
        ...state,
        current: payload
      };
    },
    setEnglish: (state: ILanguageSetting) => {
      const payload = "en";
      i18n.changeLanguage(payload);
      return state = {
        ...state,
        current: payload
      }
    },
    setSpanish: (state: ILanguageSetting) => {
      const payload = "es";
      i18n.changeLanguage(payload);
      return state = {
        ...state,
        current: payload
      }
    },
    setGerman: (state: ILanguageSetting) => {
      const payload = "de";
      i18n.changeLanguage(payload);
      return state = {
        ...state,
        current: payload
      }
    },
    setItalian: (state: ILanguageSetting) => {
      const payload = "it";
      i18n.changeLanguage(payload);
      return state = {
        ...state,
        current: payload
      }
    },
  },
});

export const selectLanguage = (state: IState) => state.language.current;
export const selectSupportedLanguages = (state: IState) => state.language.supported;
export const { setLanguage, setEnglish, setSpanish } = LanguageSlice.actions;

export default LanguageSlice.reducer;
