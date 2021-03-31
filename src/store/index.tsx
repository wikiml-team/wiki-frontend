import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../themes/themeSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export default store;
