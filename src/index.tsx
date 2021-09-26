import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "App";

import reportWebVitals from "./reportWebVitals";
import "./i18n";

import { initializeIcons, loadTheme } from "@fluentui/react";

// Store
import { Provider } from "react-redux";
import store from "store";

// Apollo
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

// Keycloack
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './keycloak'

const keycloakProviderInitConfig = {
  onLoad: "login-required",
};

// Apollo client config
const client = new ApolloClient({
  uri: 'http://80.209.237.197:3000/graphql',
  cache: new InMemoryCache()
});

// Styling
loadTheme(store.getState().theme);
initializeIcons();

// Render
ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider authClient={keycloak} initOptions={keycloakProviderInitConfig}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Provider>
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
