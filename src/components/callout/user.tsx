import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useKeycloak } from "@react-keycloak/web";
import { KeycloakProfile } from "keycloak-js";

import {
  Callout,
  CommandBarButton,
  IStackStyles,
  Link,
  mergeStyleSets,
  Persona,
  PersonaSize,
  Stack,
} from "@fluentui/react";

type UserCalloutProps = {
  isCalloutVisible: boolean;
  toggleIsCalloutVisible: () => void;
  calloutButtonId: string;
};

export default function UserCallout(props: UserCalloutProps) {
  const { isCalloutVisible, toggleIsCalloutVisible, calloutButtonId } = props;

  // LOGIC
  const { t } = useTranslation("settings", { keyPrefix: "authentication" });

  const { keycloak } = useKeycloak();
  const [profile, setProfile] = useState<KeycloakProfile>({});

  const handleLogout = () => keycloak.logout();
  const handleLogin = () => keycloak.login();

  useEffect(() => {
    keycloak
      .loadUserProfile()
      .then((info: any) => {
        setProfile(info);
      })
      .catch(() => {
        console.warn("Failed to load user profile");
      });
  }, [keycloak]);

  // STYLES
  const classes = mergeStyleSets({
    callout: {
      width: 320,
      padding: "20px 24px",
    },
    link: {
      display: "block",
      marginLeft: 60,
    },
  });

  const stackStyles: Partial<IStackStyles> = {
    root: {
      height: 40,
    },
  };

  return (
    <React.Fragment>
      {isCalloutVisible && (
        <Callout
          className={classes.callout}
          role="alertdialog"
          gapSpace={0}
          target={`#${calloutButtonId}`}
          onDismiss={toggleIsCalloutVisible}
          setInitialFocus
        >
          <Stack horizontal horizontalAlign="end" styles={stackStyles}>
            <CommandBarButton
              text={keycloak.authenticated ? t("logout") : t("login")}
              onClick={keycloak.authenticated ? handleLogout : handleLogin}
            ></CommandBarButton>
          </Stack>
          {keycloak.authenticated && (
            <>
              <Persona
                size={PersonaSize.size48}
                text={profile.firstName}
                secondaryText={profile.email}
                tertiaryText="editor"
              />
              <Link href="/settings/profile" className={classes.link}>
                {t("profile-link")}
              </Link>
            </>
          )}
        </Callout>
      )}
    </React.Fragment>
  );
}
