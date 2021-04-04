import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "themes/themeSlice";
import languageReducer from "languages/languageSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
  },
});

export default store;
