import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CommandBar,
  ICommandBarStyles,
  ITextStyles,
  Text,
  useTheme,
} from "@fluentui/react";

import { getItems } from "./items";
import { getFarItems } from "./faritems";
import SidePanel from "components/sidepanel";
import LanguagePanel from "components/sidepanel/languagepanel";
import SettingsPanel from "components/sidepanel/settings/settingspanel";

export default function CommandMenu() {
  const { palette } = useTheme();

  // ComandBar Styles
  const comandBarStyles: Partial<ICommandBarStyles> = {
    root: {
      height: 36,
      padding: 0,
      zIndex: 100,
      backgroundColor: palette.themePrimary,
    },
  };

  // ComandBar Styles
  const textStyles: Partial<ITextStyles> = {
    root: {
      position: "absolute",
      top: 10,
      left: "50%",
      transform: "translateX(-50%)",
      color: palette.themeLight,
      zIndex: 999,
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

  const { t } = useTranslation(["commands", "sidepanel", "methodologies"]);
  const { mainItems, overflowItems, overflowProps } = getItems({ palette, t });
  const farItems = getFarItems({
    OpenLanguagePanel,
    OpenSettingsPanel,
    palette,
    t,
  });

  return (
    <React.Fragment>
      <Text variant="small" styles={textStyles}>
        Project 1 - {t("methodologies:canadian")}
      </Text>
      <CommandBar
        items={mainItems}
        overflowItems={overflowItems}
        overflowButtonProps={overflowProps}
        farItems={farItems}
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
