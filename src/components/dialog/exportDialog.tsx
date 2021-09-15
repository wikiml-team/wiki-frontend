import { IChoiceGroupOption, IChoiceGroupOptionStyles, IIconStyles } from '@fluentui/react';
import { useTranslation } from 'react-i18next';

import CustomDialog from './customDialog'

type ExportDialogProps = {
    hideDialog: boolean,
    toggleHideDialog: () => void
}

export default function ExportDialog(props: ExportDialogProps) {

    const {hideDialog, toggleHideDialog} = props;

    const { t } = useTranslation("dialog");


    const choiceGroupStyle : IChoiceGroupOptionStyles = {
        root: {
            width: 70,
            // height: 50,
            marginBottom: 20,
        },
        choiceFieldWrapper: {
            width: 70,
            height: 70,
            borderColor: "red",
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
          key: 'A',
          iconProps: { iconName: 'WordDocument', styles: iconStyle },
          text: 'Word',
          styles: choiceGroupStyle
        },
        {
          key: 'B',
          iconProps: { iconName: 'ExcelDocument', styles: iconStyle },
          text: 'Excell',
          styles: choiceGroupStyle
        },
        {
          key: 'C',
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
            title={t("export-title")}
            hideDialog={hideDialog}
            toggleHideDialog={toggleHideDialog}
            primaryButtonText={t("export-accept-label")}
            acceptOnClick={handleAccpetButtonOnClick}
            options={options}
            optionsTitle={t("export-options-title")}
      />
}
