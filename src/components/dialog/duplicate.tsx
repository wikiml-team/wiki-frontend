import { useTranslation } from 'react-i18next';

import { IChoiceGroupOption } from '@fluentui/react';

import ExecuteQuery from 'apollo/executequery';
import { GET_METHODOLOGIES } from 'apollo/methodologies';
import CustomDialog from './custom'

type ExportDialogProps = {
    hideDialog: boolean,
    toggleHideDialog: () => void
}

export default function DuplicateProjectDialog(props: ExportDialogProps) {

    // LOGIC
    const {hideDialog, toggleHideDialog} = props;

    const { t } = useTranslation("dialog");

    const mapMethodologiesToOptions = (data : any) => {
      return data.methodologies.map(({ id , name } : any) => {
        return {
          key: `key${id}`,
          text: name
        } as IChoiceGroupOption
      })
    }

    const options = ExecuteQuery({query: GET_METHODOLOGIES, applyToData: mapMethodologiesToOptions}) as IChoiceGroupOption[];

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
              // inline conditionally pass props
              {...(options.length > 0 && {optionsProps: {
                options,
                optionsTitle : t("duplicate-options-title")
              }})}
            />
}