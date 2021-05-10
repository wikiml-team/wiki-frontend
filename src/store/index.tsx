import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "store/slices/themeslice";
import languageReducer from "store/slices/languageslice";
import helpReducer from "store/slices/settingslice";
import projectReducer from "store/slices/projectslice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    help: helpReducer,
    project: projectReducer,
  },
});

export default store;
