import { ICommandBarItemProps } from "@fluentui/react";

import { fullscreenToggler } from "components/fullscreentoogler";
import {
  farButtonStyles,
  userButtonStyles,
  whiteIconStyle,
} from "./__styles__/commandstyles";

interface IFarItemsHandlers {
  OpenLanguagePanel: () => void;
  OpenSettingsPanel: () => void;
}

export const farItems = (handlers: IFarItemsHandlers) => {
  const { OpenLanguagePanel, OpenSettingsPanel } = handlers;

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
