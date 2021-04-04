import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { CommandBar, ICommandBarStyles, useTheme } from "@fluentui/react";

import { getItems } from "./items";
import { getFarItems } from "./faritems";
import SidePanel from "components/sidepanel";
import LanguagePanel from "components/sidepanel/languagepanel";
import SettingsPanel from "components/sidepanel/settingspanel";

export default function CommandMenu() {
  const palette = useTheme().palette;

  // ComandBar Styles
  const comandBarStyles: Partial<ICommandBarStyles> = {
    root: {
      height: 36,
      padding: 0,
      zIndex: 100,
      backgroundColor: palette.themePrimary,
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

  const { t } = useTranslation(["commands", "sidepanel"]);
  const { mainItems, overflowItems, overflowProps } = getItems({ palette, t });
  const farItems = getFarItems({
    OpenLanguagePanel,
    OpenSettingsPanel,
    palette,
    t,
  });

  return (
    <React.Fragment>
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
