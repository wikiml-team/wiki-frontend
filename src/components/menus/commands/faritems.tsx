import {
  IButtonStyles,
  ICommandBarItemProps,
  IIconStyles,
  IPalette,
} from "@fluentui/react";

import { fullscreenToggler } from "components/fullscreentoogler";

type FarItemsProps = {
  OpenLanguagePanel: () => void;
  OpenSettingsPanel: () => void;
  palette: IPalette;
};

export const getFarItems = (props: FarItemsProps) => {
  const { OpenLanguagePanel, OpenSettingsPanel, palette } = props;

  // Button & Inon Styles
  const whiteIconStyle: IIconStyles = { root: { color: palette.white } };

  const userButtonStyles: IButtonStyles = {
    root: {
      borderLeft: "2px solid " + palette.neutralQuaternaryAlt,
      borderWidth: "thin",
      backgroundColor: palette.themePrimary,
      color: palette.white,
    },
    rootHovered: {
      background: palette.themeSecondary,
    },
    rootPressed: {
      backgroundColor: palette.themePrimary,
    },
    iconHovered: {
      color: palette.white,
    },
    iconPressed: {
      color: palette.neutralQuaternaryAlt,
    },
    labelHovered: {
      color: palette.white,
    },
    label: {
      selectors: {
        ":active": {
          color: palette.white,
        },
      },
    },
  };

  const farButtonStyles: IButtonStyles = {
    root: {
      backgroundColor: palette.themePrimary,
    },
    rootHovered: {
      backgroundColor: palette.themePrimary,
    },
    rootPressed: {
      backgroundColor: palette.themePrimary,
    },
    iconHovered: {
      color: palette.white,
    },
    iconPressed: {
      color: palette.neutralQuaternaryAlt,
    },
  };

  return [
    {
      key: "fullscreen",
      text: "Fullscreen",
      // This needs an ariaLabel since it's icon-only
      ariaLabel: "Full Screen",
      iconOnly: true,
      iconProps: { iconName: "FullScreen", styles: whiteIconStyle },
      onClick: fullscreenToggler,
      buttonStyles: farButtonStyles,
    },
    {
      key: "language",
      text: "Language",
      // This needs an ariaLabel since it's icon-only
      ariaLabel: "Language",
      iconOnly: true,
      iconProps: { iconName: "LocaleLanguage", styles: whiteIconStyle },
      onClick: OpenLanguagePanel,
      buttonStyles: farButtonStyles,
    },
    {
      key: "settings",
      text: "Settings",
      // This needs an ariaLabel since it's icon-only
      ariaLabel: "Change Settings",
      iconOnly: true,
      iconProps: { iconName: "Settings", styles: whiteIconStyle },
      onClick: OpenSettingsPanel,
      buttonStyles: farButtonStyles,
    },

    {
      key: "user",
      text: "Gabriela Rodríguez",
      ariaLabel: "User name",
      iconProps: { iconName: "Contact", styles: whiteIconStyle },
      onClick: () => alert("Contact"),
      buttonStyles: userButtonStyles,
    },
  ] as ICommandBarItemProps[];
};
