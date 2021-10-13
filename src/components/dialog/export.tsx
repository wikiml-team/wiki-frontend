import { useTranslation } from 'react-i18next';

import {IChoiceGroupOption, 
        IChoiceGroupOptionStyles,
        IIconStyles } from '@fluentui/react';

import CustomDialog from './custom'

type ExportDialogProps = {
    hideDialog: boolean,
    toggleHideDialog: () => void
}

export default function ExportProjectDialog(props: ExportDialogProps) {

    // LOGIC
    const {hideDialog, toggleHideDialog} = props;

    const { t } = useTranslation("dialog");

    // STYLES
    const choiceGroupStyle : IChoiceGroupOptionStyles = {
        root: {
            width: 70,
            // height: 50,
            marginBottom: 20,
        },
        choiceFieldWrapper: {
            width: 70,
            height: 70,
            paddingTop: 0,
        },
    }

    const iconStyle : IIconStyles = {
        root: {
            fontSize: 20,
          },
    }

    const options : IChoiceGroupOption[] = [
        {
          key: 'key1',
          iconProps: { iconName: 'WordDocument', styles: iconStyle },
          text: 'Word',
          styles: choiceGroupStyle
        },
        {
          key: 'key2',
          iconProps: { iconName: 'ExcelDocument', styles: iconStyle },
          text: 'Excell',
          styles: choiceGroupStyle
        },
        {
          key: 'key3',
          iconProps: { iconName: 'PDF', styles: iconStyle },
          text: 'PDF',
          styles: choiceGroupStyle
        },
      ];

    const handleAccpetButtonOnClick = (option: string) => {
        alert(option)
        toggleHideDialog()
    }

    return <CustomDialog
              dialogContentProps={{title : t("export-title")}}
              hidden={hideDialog}
              onDismiss={toggleHideDialog}
              primaryButtonText={t("export-accept-label")}
              acceptOnClick={handleAccpetButtonOnClick}
              optionsProps={{
                options,
                optionsTitle : t("export-options-title")
              }}
            />
}
