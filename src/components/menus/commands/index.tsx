import React from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

import {
  CommandBar,
  IButtonProps,
  ICommandBarStyles,
  ITextStyles,
  Panel,
  Text,
  useTheme,
} from "@fluentui/react";
import { useBoolean, useId } from "@fluentui/react-hooks";

import { useQuery } from "@apollo/client";
import { GetProjectById, GetProjectByIdVariables } from "types";
import { GET_PROJECT_BY_ID } from "apollo/projects/project";
import QueryStateIndicator from "apollo/indicator";

import { GetFarItems, GetItems, GetOverflowItems } from "./items";
import { CustomBarButton, CustomOverflowButton } from "./custombuttons";
import LanguagePanelContent from "components/sidepanel/contents/language";
import SettingsPanelContent from "components/sidepanel/contents/settings";
import ExportProjectDialog from "components/dialog/export";
import DuplicateProjectDialog from "components/dialog/duplicate";
import DestroyProjectDialog from "components/dialog/destroy";
import UserCallout from "components/callout/user";

export default function CommandMenu() {
  // LOGIC
  const { t } = useTranslation("commands");
  const { t: t_basics } = useTranslation("basics", {
    keyPrefix: "methodologies",
  });

  const { projectId } = useParams<any>();

  // Panels State
  const [
    languagePanelOpen,
    { setTrue: openLanguagePanel, setFalse: dismissLanguagePanel },
  ] = useBoolean(false);
  const [
    settingsPanelOpen,
    { setTrue: openSettingsPanel, setFalse: dismissSettingsPanel },
  ] = useBoolean(false);

  // Dialogs State
  const [exportHideDialog, { toggle: toggleExportHideDialog }] =
    useBoolean(true);
  const [duplicateHideDialog, { toggle: toggleDuplicateHideDialog }] =
    useBoolean(true);
  const [destroyHideDialog, { toggle: toggleDestroyHideDialog }] =
    useBoolean(true);

  // Callout State
  const [isUserCalloutVisible, { toggle: toggleIsUserCalloutVisible }] =
    useBoolean(false);
  const calloutButtonId = useId("user-callout-button");

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
      zIndex: 10,
    },
  };

  const overflowProps: IButtonProps = {
    ariaLabel: "More commands",
    menuProps: {
      styles: {
        subComponentStyles: {
          menuItem: {
            icon: { color: palette.black },
          },
        },
      },
      items: [],
    },
  };

  // DATA
  const _items = GetItems(toggleExportHideDialog);
  const _faritems = GetFarItems(
    openLanguagePanel,
    openSettingsPanel,
    toggleIsUserCalloutVisible,
    calloutButtonId
  );
  const _overflowitems = GetOverflowItems(
    toggleDuplicateHideDialog,
    toggleDestroyHideDialog
  );

  const { data, loading, error } = useQuery<
    GetProjectById,
    GetProjectByIdVariables
  >(GET_PROJECT_BY_ID, {
    variables: {
      id: projectId,
    },
  });

  const name = data?.project?.shortName || "";
  const methodology = data?.project?.methodology.name || "";

  return (
    <React.Fragment>
      <Text variant="small" styles={textStyles}>
        {name} - {t_basics(methodology, methodology)}
      </Text>

      <CommandBar
        buttonAs={CustomBarButton}
        items={_items}
        farItems={_faritems}
        overflowItems={_overflowitems}
        overflowButtonAs={CustomOverflowButton}
        overflowButtonProps={overflowProps}
        ariaLabel="Use left and right arrow keys to navigate between commands"
        styles={comandBarStyles}
      />

      <Panel
        isLightDismiss
        isOpen={languagePanelOpen}
        closeButtonAriaLabel="Close"
        isHiddenOnDismiss={true}
        headerText={t("language.header")}
        onDismiss={dismissLanguagePanel}
      >
        <LanguagePanelContent />
      </Panel>

      <Panel
        isLightDismiss
        isOpen={settingsPanelOpen}
        closeButtonAriaLabel="Close"
        isHiddenOnDismiss={true}
        headerText={t("settings.header")}
        onDismiss={dismissSettingsPanel}
        isBlocking={false}
      >
        <SettingsPanelContent />
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
