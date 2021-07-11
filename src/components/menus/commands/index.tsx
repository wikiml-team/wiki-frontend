import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CommandBar,
  ICommandBarStyles,
  ITextStyles,
  Text,
  useTheme,
} from "@fluentui/react";

import { faritems, items, overflowItems } from "./items";
import SidePanel from "components/sidepanel";
import LanguagePanel from "components/sidepanel/languagepanel";
import SettingsPanel from "components/sidepanel/settings/settingspanel";
import { CustomBarButton, CustomOverflowButton, overflowProps } from "./custombuttons";

export default function CommandMenu() {
  const { palette } = useTheme();
  const { t } = useTranslation("methodologies");

  // STYLES
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
  const [languagePanelOpen, setLanguagePanelOpen] = useState(false);
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);

  const OpenLanguagePanel = useCallback(() => {
    setLanguagePanelOpen(true);
    setSettingsPanelOpen(false);
  }, []);
  const CloseLanguagePanel = useCallback(() => setLanguagePanelOpen(false), []);

  const OpenSettingsPanel = useCallback(() => {
    setSettingsPanelOpen(true);
    setLanguagePanelOpen(false);
  }, []);
  const CloseSettingsPanel = useCallback(() => setSettingsPanelOpen(false), []);

  return (
    <React.Fragment>
      <Text variant="small" styles={textStyles}>
        Project 1 - {t("methodologies:canadian")}
      </Text>

      <CommandBar
        buttonAs={CustomBarButton}
        items={items}
        farItems={faritems(OpenLanguagePanel, OpenSettingsPanel)}
        overflowItems={overflowItems}
        overflowButtonAs={CustomOverflowButton}
        overflowButtonProps={overflowProps(palette)}
        ariaLabel="Use left and right arrow keys to navigate between commands"
        styles={comandBarStyles}
      />

      <SidePanel
        header={t("sidepanel:headerlang")}
        content={<LanguagePanel />}
        isOpen={languagePanelOpen}
        handleClose={CloseLanguagePanel}
      />
      <SidePanel
        header={t("sidepanel:headersettings")}
        content={<SettingsPanel />}
        isOpen={settingsPanelOpen}
        handleClose={CloseSettingsPanel}
      />
    </React.Fragment>
  );
}
