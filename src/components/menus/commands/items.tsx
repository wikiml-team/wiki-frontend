import i18n from "i18n"
import {
  ICommandBarItemProps,
} from "@fluentui/react";

import { fullscreenToggler } from "components/fullscreentoggler";
import { KeycloakInstance } from "keycloak-js";

i18n.loadNamespaces("commands");

export const items = (toggleHideDialog: Function) => {
  return [
    {
      key: "goback",
      iconProps: { iconName: "Undo" },
      text: i18n.t('commands:undo'),
      iconOnly: true,
    },
    {
      key: "goforward",
      iconProps: { iconName: "Redo" },
      text: i18n.t('commands:redo'),
      iconOnly: true,
    },
    {
      key: "share",
      iconProps: { iconName: "Share" },
      text: i18n.t('commands:share'),
      iconOnly: true,
      onClick: () => alert("Share"),
    },
    {
      key: "export",
      iconProps: { iconName: "Export" },
      text: i18n.t('commands:export'),
      iconOnly: true,
      onClick: toggleHideDialog,
    },
  ] as ICommandBarItemProps[]
}

export const overflowItems: ICommandBarItemProps[] = [
  {
    key: "new",
    text: i18n.t("commands:newproject"),
    iconProps: { iconName: "Document" },
    onClick: () => alert("Move to"),
  },
  {
    key: "open",
    text: i18n.t("commands:openproject"),
    iconProps: { iconName: "OpenFolderHorizontal" },
    onClick: () => alert("Open Project"),
  },
  {
    key: "Destroy",
    text: i18n.t("commands:destroyproject"),
    iconProps: { iconName: "PageRemove" },
    onClick: () => alert("Destroy project"),
  },
  {
    key: "Duplicate",
    text: i18n.t("commands:duplicate"),
    iconProps: { iconName: "Documentation" },
    onClick: () => alert("Duplicate project"),
  },
  {
    key: "Print",
    text: i18n.t("commands:print"),
    iconProps: { iconName: "Print" },
    onClick: () => alert("Print project"),
  },
];

export const faritems = (OpenLanguagePanel: Function, OpenSettingsPanel: Function, t: Function, keycloak : KeycloakInstance) => {
  
  const handleLogout = () => keycloak.logout();
  const handleLogin = () => keycloak.login();
  
  return [
    {
      key: "fullscreen",
      text: i18n.t("commands:fullscreen"),
      ariaLabel: "Full Screen",
      iconOnly: true,
      iconProps: { iconName: "FullScreen" },
      onClick: fullscreenToggler,
    },
    {
      key: "language",
      text: i18n.t("commands:language"),
      ariaLabel: "Language",
      iconOnly: true,
      iconProps: { iconName: "LocaleLanguage" },
      onClick: OpenLanguagePanel,
    },
    {
      key: "settings",
      text: i18n.t("commands:settings"),
      ariaLabel: "Change Settings",
      iconOnly: true,
      iconProps: { iconName: "Settings" },
      onClick: OpenSettingsPanel,
    },
    {
      key: "notifications",
      text: i18n.t("commands:notifications"),
      ariaLabel: "Change Notifications",
      iconOnly: true,
      iconProps: { iconName: "Ringer" },
      onClick: () => alert("Notificactions"),
    },
    {
      key: "user",
      text: keycloak.authenticated? t("authentication:logout") : t("authentication:login"),
      ariaLabel: "User name",
      iconOnly: true,
      iconProps: { iconName: "Contact" },
      onClick: keycloak.authenticated? handleLogout : handleLogin
    },
  ] as ICommandBarItemProps[];
}

