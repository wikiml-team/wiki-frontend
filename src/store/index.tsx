import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "themes/themeslice";
import languageReducer from "languages/languageslice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
  },
});

export default store;
