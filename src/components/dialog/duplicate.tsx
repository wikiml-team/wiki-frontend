import { useTranslation } from "react-i18next";

import { IChoiceGroupOption } from "@fluentui/react";

import { GET_METHODOLOGIES } from "apollo/methodologies";
import { useQuery } from "@apollo/client";
import QueryStateIndicator from "apollo/indicator";
import { GetMethodologies, GetMethodologies_methodologies } from "types";

import CustomDialog from "./custom";

type ExportDialogProps = {
  hideDialog: boolean;
  toggleHideDialog: () => void;
};

export default function DuplicateProjectDialog(props: ExportDialogProps) {
  // LOGIC
  const { hideDialog, toggleHideDialog } = props;

  const { t } = useTranslation("commands", { keyPrefix: "duplicate" });

  const handleAccpetButtonOnClick = (option: string) => {
    alert(option);
    toggleHideDialog();
  };

  // DATA
  const { data, loading, error } =
    useQuery<GetMethodologies>(GET_METHODOLOGIES);

  <QueryStateIndicator data={data} loading={loading} error={error} />;

  const options =
    data &&
    data.methodologies.map((methodology) =>
      MapMethodologyToOptions(methodology)
    );

  return (
    <CustomDialog
      dialogContentProps={{ title: t("header") }}
      primaryButtonText={t("accept-label")}
      acceptOnClick={handleAccpetButtonOnClick}
      // inline conditionally pass props
      {...(options && {
        optionsProps: {
          options,
          optionsTitle: t("select-label"),
        },
      })}
      hidden={hideDialog}
      onDismiss={toggleHideDialog}
    />
  );
}

const MapMethodologyToOptions = (
  methodology: GetMethodologies_methodologies
) => {
  const { id, name } = methodology;

  return {
    key: `key${id}`,
    text: name,
  } as IChoiceGroupOption;
};
