import { useKeycloak } from "@react-keycloak/web";
import { FunctionComponent } from "react";

const MainLayout: FunctionComponent = (props) => {
  const { keycloak } = useKeycloak();

  const handleLogout = () => keycloak.logout();
  const handleLogin = () => keycloak.login();

  if (keycloak.authenticated) {
    console.log("authenticated", { keycloak });
  }

  return (
    <div>
      <nav className='login'>
        {keycloak.authenticated ? (
          <>
            {(keycloak.tokenParsed as any).preferred_username}
            <button onClick={handleLogout}>Logout</button>

            <br />
            <p>{keycloak.token}</p>
          </>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </nav>
      {props.children}
    </div>
  );
};

export default MainLayout;
