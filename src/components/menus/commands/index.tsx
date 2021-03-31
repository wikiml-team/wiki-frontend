import React, { useCallback, useState } from "react";
import { CommandBar, ICommandBarStyles } from "@fluentui/react";

import { mainItems } from "./mainitems";
import { overflowItems, overflowProps } from "./overflowitems";
import { farItems } from "./faritems";

// ComandBar Styles
const comandBarStyles: Partial<ICommandBarStyles> = {
  root: {
    width: "100%",
    height: 36,
    paddingLeft: 0,
    zIndex: 100,
    backgroundColor: "#2b579a",
  },
};

export default function CommandMenu() {
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
      <CommandBar
        items={mainItems}
        overflowItems={overflowItems}
        overflowButtonProps={overflowProps}
        farItems={farItems({ OpenLanguagePanel, OpenSettingsPanel })}
        ariaLabel="Use left and right arrow keys to navigate between commands"
        styles={comandBarStyles}
      />
    </React.Fragment>
  );
}
