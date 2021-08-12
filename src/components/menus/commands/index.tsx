import React from "react";
import { useTranslation } from "react-i18next";
import {
  CommandBar,
  ICommandBarStyles,
  ITextStyles,
  Text,
  useTheme,
  Panel
} from "@fluentui/react";
import { useBoolean } from '@fluentui/react-hooks';

import { faritems, items, overflowItems } from "./items";
import LanguagePanel from "components/sidepanel/languagepanel";
import SettingsPanel from "components/sidepanel/settingspanel";
import { CustomBarButton, CustomOverflowButton, overflowProps } from "./custombuttons";

export default function CommandMenu() {

  // STYLES
  const { palette } = useTheme();

  const comandBarStyles: ICommandBarStyles = {
    root: {
      height: 36,
      padding: 0,
      backgroundColor: palette.themePrimary,
    },
  };

  const textStyles: ITextStyles = {
    root: {
      position: "absolute",
      top: 10,
      left: "50%",
      transform: "translateX(-50%)",
      color: palette.themeLight,
    },
  };

  // Panel State
  const { t } = useTranslation("methodologies");

  const [languagePanelOpen, { setTrue: openLanguagePanel, setFalse: dismissLanguagePanel }] = useBoolean(false);
  const [settingsPanelOpen, { setTrue: openSettingsPanel, setFalse: dismissSettingsPanel }] = useBoolean(false);

  return (
    <React.Fragment>
      <Text variant="small" styles={textStyles}>
        Project 1 - {t("methodologies:canadian")}
      </Text>

      <CommandBar
        buttonAs={CustomBarButton}
        items={items}
        farItems={faritems(openLanguagePanel, openSettingsPanel)}
        overflowItems={overflowItems}
        overflowButtonAs={CustomOverflowButton}
        overflowButtonProps={overflowProps(palette)}
        ariaLabel="Use left and right arrow keys to navigate between commands"
        styles={comandBarStyles}
      />

      <Panel
        isOpen={languagePanelOpen}
        closeButtonAriaLabel="Close"
        isHiddenOnDismiss={true}
        headerText={t("sidepanel:headerlang")}
        onDismiss={dismissLanguagePanel}>
        <LanguagePanel />
      </Panel>

      <Panel
        isOpen={settingsPanelOpen}
        closeButtonAriaLabel="Close"
        isHiddenOnDismiss={true}
        headerText={t("sidepanel:headersettings")}
        onDismiss={dismissSettingsPanel}>
        <SettingsPanel />
      </Panel>
    </React.Fragment>
  );
}
