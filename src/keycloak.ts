import Keycloak from "keycloak-js";

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = Keycloak({
  url: "http://80.209.237.197/auth",
  realm: "wikiml",
  clientId: "frontend",
});

export default keycloak;
