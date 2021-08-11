import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "App";
import reportWebVitals from "./reportWebVitals";
import "./i18n";

import { initializeIcons, loadTheme } from "@fluentui/react";

import { Provider } from "react-redux";
import store from "store";

import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import keycloak from "keycloak";
import { ApolloProvider } from "@apollo/client";
import { client } from "apollo";

loadTheme(store.getState().theme);
initializeIcons();

const App = () => {
  const { keycloak } = useKeycloak();
  return (
    <ApolloProvider client={client(keycloak.token)}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider authClient={keycloak}>
      <App />
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
