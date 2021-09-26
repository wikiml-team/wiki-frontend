import { useTranslation } from 'react-i18next';

import CustomDialog from './custom'

type ExportDialogProps = {
    hideDialog: boolean,
    toggleHideDialog: () => void
}

export default function DestroyProjectDialog(props: ExportDialogProps) {

    // LOGIC
    const {hideDialog, toggleHideDialog} = props;

    const { t } = useTranslation("dialog");

    const dialogContentProps = {
        // type: DialogType.largeHeader,
        title: t("destroy-title"),
        subText: t("destroy-text"),
      };

    const handleAccpetButtonOnClick = (option: string) => {
        toggleHideDialog()
    }

    return <CustomDialog
            dialogContentProps={dialogContentProps}
            hidden={hideDialog}
            onDismiss={toggleHideDialog}
            primaryButtonText={t("destroy-accept-label")}
            acceptOnClick={handleAccpetButtonOnClick}
    />
}
