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
import { useBoolean, useId } from '@fluentui/react-hooks';

import { GetFarItems, GetItems, GetOverflowItems } from "./items";
import LanguagePanel from "components/sidepanel/contents/languagecontent";
import SettingsPanel from "components/sidepanel/contents/settingscontent";
import { CustomBarButton, CustomOverflowButton, OverflowProps } from "./custombuttons";
import ExportProjectDialog from "components/dialog/export";
import DuplicateProjectDialog from "components/dialog/duplicate";
import DestroyProjectDialog from "components/dialog/destroy";
import UserCallout from "components/callout/user";

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
      zIndex: 10
    },
  };

  // LOGIC
  const { t } = useTranslation(["language-settings", "settings", "methodologies", "authentication"]);
  
  // Panels State
  const [languagePanelOpen, { setTrue: openLanguagePanel, setFalse: dismissLanguagePanel }] = useBoolean(false);
  const [settingsPanelOpen, { setTrue: openSettingsPanel, setFalse: dismissSettingsPanel }] = useBoolean(false);

  // Dialogs State
  const [exportHideDialog, { toggle: toggleExportHideDialog }] = useBoolean(true);
  const [duplicateHideDialog, { toggle: toggleDuplicateHideDialog }] = useBoolean(true);
  const [destroyHideDialog, { toggle: toggleDestroyHideDialog }] = useBoolean(true);

  // Callout State
  const [isUserCalloutVisible, { toggle: toggleIsUserCalloutVisible }] = useBoolean(false);
  const calloutButtonId = useId('user-callout-button');

  return (
    <React.Fragment>
      <Text variant="small" styles={textStyles}>
        Agua y Saneamiento - {t("methodologies:canadian")}
      </Text>

      <CommandBar
        buttonAs={CustomBarButton}
        items={GetItems(toggleExportHideDialog)}
        farItems={GetFarItems(openLanguagePanel, openSettingsPanel, toggleIsUserCalloutVisible, calloutButtonId)}
        overflowItems={GetOverflowItems(toggleDuplicateHideDialog, toggleDestroyHideDialog)}
        overflowButtonAs={CustomOverflowButton}
        overflowButtonProps={OverflowProps()}
        ariaLabel="Use left and right arrow keys to navigate between commands"
        styles={comandBarStyles}
      />

      <Panel
        isOpen={languagePanelOpen}
        closeButtonAriaLabel="Close"
        isHiddenOnDismiss={true}
        headerText={t("language-settings:language-header")}
        onDismiss={dismissLanguagePanel}
        isBlocking={false}>
        <LanguagePanel />
      </Panel>

      <Panel
        isOpen={settingsPanelOpen}
        closeButtonAriaLabel="Close"
        isHiddenOnDismiss={true}
        headerText={t("settings:settings-header")}
        onDismiss={dismissSettingsPanel}
        isBlocking={false}>
        <SettingsPanel />
      </Panel>

      <ExportProjectDialog
        hideDialog={exportHideDialog}
        toggleHideDialog={toggleExportHideDialog}
      />

      <DuplicateProjectDialog
        hideDialog={duplicateHideDialog}
        toggleHideDialog={toggleDuplicateHideDialog}
      />

      <DestroyProjectDialog
        hideDialog={destroyHideDialog}
        toggleHideDialog={toggleDestroyHideDialog}
      />

      <UserCallout
        isCalloutVisible={isUserCalloutVisible}
        toggleIsCalloutVisible={toggleIsUserCalloutVisible} 
        calloutButtonId={calloutButtonId}
      />
    </React.Fragment>
  );
}
