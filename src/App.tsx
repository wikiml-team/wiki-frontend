import React, { Suspense } from "react";
import Routes from "routes";
import { useSelector, useDispatch } from "react-redux";
import themeReducer, { theme, themeActions } from "themes/themeSlice";

function App() {
  const currentTheme = useSelector(theme);
  const dispatch = useDispatch();
  dispatch(themeActions.setRed());

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h1>Theme</h1>
      {currentTheme}
      <Routes />
    </Suspense>
  );
}

export default App;
