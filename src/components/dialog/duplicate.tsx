import { useQuery } from '@apollo/client';
import { IChoiceGroupOption, ProgressIndicator } from '@fluentui/react';
import { GET_METHODOLOGIES } from 'apollo/methodologies';
import { useTranslation } from 'react-i18next';

import CustomDialog from './custom'

type ExportDialogProps = {
    hideDialog: boolean,
    toggleHideDialog: () => void
}

export default function DuplicateProjectDialog(props: ExportDialogProps) {

    // LOGIC
    const {hideDialog, toggleHideDialog} = props;

    const { t } = useTranslation("dialog");

    const options = MapMethodologiesToOptions() as IChoiceGroupOption[];

    const handleAccpetButtonOnClick = (option: string) => {
        alert(option)
        toggleHideDialog()
    }

    return <CustomDialog
            hidden={hideDialog}
            onDismiss={toggleHideDialog}
            dialogContentProps={{title : t("duplicate-title")}}
            primaryButtonText={t("duplicate-accept-label")}
            acceptOnClick={handleAccpetButtonOnClick}
            optionsProps={{
              options,
              optionsTitle : t("duplicate-options-title")
            }}
      />
}

export const MapMethodologiesToOptions = () => {

  const {loading, error, data} = useQuery(GET_METHODOLOGIES);
  const { t } = useTranslation("loading")

  if (loading) {
      return <ProgressIndicator
              label={t("loading-title")} 
              description={t("loading-description")} />
  }
  
  if (error) return <p>Error :(</p>;

  return data.methodologies.map(({ id , name } : any) => {
    return {
      key: `key${id}`,
      text: name
    } as IChoiceGroupOption
  })

}
