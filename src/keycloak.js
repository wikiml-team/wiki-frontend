import Keycloak from 'keycloak-js'

const keycloakConfig = {
   url: 'http://80.209.237.197/auth', 
   realm: 'wikiml', 
   clientId: 'frontend'
}

const keycloak = new Keycloak(keycloakConfig);
export default keycloak