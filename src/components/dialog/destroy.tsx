import { useTranslation } from "react-i18next";

import CustomDialog from "./custom";

type ExportDialogProps = {
  hideDialog: boolean;
  toggleHideDialog: () => void;
};

export default function DestroyProjectDialog(props: ExportDialogProps) {
  const { hideDialog, toggleHideDialog } = props;

  // LOGIC
  const { t } = useTranslation("commands", { keyPrefix: "destroy" });

  const dialogContentProps = {
    title: t("header"),
    subText: t("text"),
  };

  const handleAccpetButtonOnClick = (option: string) => {
    // ... more code
    toggleHideDialog();
  };

  return (
    <CustomDialog
      dialogContentProps={dialogContentProps}
      primaryButtonText={t("accept-label")}
      acceptOnClick={handleAccpetButtonOnClick}
      hidden={hideDialog}
      onDismiss={toggleHideDialog}
    />
  );
}
