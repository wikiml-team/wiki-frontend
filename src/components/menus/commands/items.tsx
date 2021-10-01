import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import {
  ICommandBarItemProps,
} from "@fluentui/react";

import i18n from "i18n"
import { fullscreenToggler } from "components/fullscreentoggler";

i18n.loadNamespaces(["commands", "authentication"]);

export const GetItems = (exportToggleHideDialog: Function) => {

  const { t } = useTranslation("commands")

  return [
    {
      key: "goback",
      iconProps: { iconName: "Undo" },
      text: t('undo'),
      iconOnly: true,
    },
    {
      key: "goforward",
      iconProps: { iconName: "Redo" },
      text: t('redo'),
      iconOnly: true,
    },
    {
      key: "share",
      iconProps: { iconName: "Share" },
      text: t('share'),
      iconOnly: true,
      onClick: () => alert("Share"),
    },
    {
      key: "export",
      iconProps: { iconName: "Export" },
      text: t('export'),
      iconOnly: true,
      onClick: exportToggleHideDialog,
    },
  ] as ICommandBarItemProps[]
}

export const GetOverflowItems = (duplicateToggleHideDialog: Function, toggleDestroyHideDialog: Function) => {

  const history = useHistory();
  const { t } = useTranslation("commands")

  return [{
    key: "new",
    text: t("newproject"),
    iconProps: { iconName: "Document" },
    onClick: () => history.push("/new"),
  },
  {
    key: "open",
    text: t("openproject"),
    iconProps: { iconName: "OpenFolderHorizontal" },
    onClick: () => history.push("/open"),
  },
  {
    key: "Destroy",
    text: t("destroyproject"),
    iconProps: { iconName: "PageRemove" },
    onClick: toggleDestroyHideDialog,
  },
  {
    key: "Duplicate",
    text: t("duplicate"),
    iconProps: { iconName: "Documentation" },
    onClick: duplicateToggleHideDialog,
  },
  {
    key: "Print",
    text: t("print"),
    iconProps: { iconName: "Print" },
    onClick: () => alert("Print project"),
  },
] as ICommandBarItemProps[]};


export const GetFarItems = (OpenLanguagePanel: Function, OpenSettingsPanel: Function, ToogleCallout: Function, calloutButtonId : string) => {
  
  const { t } = useTranslation(["commands", "authentication"])

  return [
    {
      key: "fullscreen",
      text: t("fullscreen"),
      ariaLabel: "Full Screen",
      iconOnly: true,
      iconProps: { iconName: "FullScreen" },
      onClick: fullscreenToggler,
    },
    {
      key: "language",
      text: t("language"),
      ariaLabel: "Language",
      iconOnly: true,
      iconProps: { iconName: "LocaleLanguage" },
      onClick: OpenLanguagePanel,
    },
    {
      key: "settings",
      text: t("settings"),
      ariaLabel: "Change Settings",
      iconOnly: true,
      iconProps: { iconName: "Settings" },
      onClick: OpenSettingsPanel,
    },
    {
      key: "notifications",
      text: t("notifications"),
      ariaLabel: "Change Notifications",
      iconOnly: true,
      iconProps: { iconName: "Ringer" },
      onClick: () => alert("Notificactions"),
    },
    {
      id: calloutButtonId,
      key: "user",
      ariaLabel: "User name",
      iconOnly: true,
      iconProps: { iconName: "Contact" },
      onClick: ToogleCallout
    },
  ] as ICommandBarItemProps[];
}
