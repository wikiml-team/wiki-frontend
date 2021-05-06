import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "themes/themeSlice";
import languageReducer from "languages/languageSlice";
import helpReducer from "components/sidepanel/settings/settingslice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    help: helpReducer,
  },
});

export default store;
