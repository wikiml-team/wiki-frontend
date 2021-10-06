import React from 'react'
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { Dropdown, 
        Icon, 
        Stack, 
        TextField, 
        Toggle, 
        TooltipHost } from '@fluentui/react';

import CustomDialog from './custom';

type NewProjectCalloutProps = {
    hideDialog: boolean,
    toggleHideDialog: () => void,
    methodologyId: string
}

export default function NewProjectDialog(props : NewProjectCalloutProps) {

    // LOGIC
    const { hideDialog, toggleHideDialog, methodologyId } = props;
    
    const { t } = useTranslation("dialog")
    const history = useHistory()

    const handleAccpetButtonOnClick = (option: string) => {
        toggleHideDialog()
        alert(`Created project with methodology ${methodologyId}`)
        history.push(`/workplace/${methodologyId}/1`)
    }

    return <CustomDialog
        dialogContentProps={{title : t("create-project-title")}}
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        primaryButtonText={t("create-project-accept-label")}
        acceptOnClick={handleAccpetButtonOnClick}
        optionalBody={<NewProjectDialogBody/>}
  />
}

function NewProjectDialogBody() {
    const { t } = useTranslation("dialog")

    return <Stack tokens={{ childrenGap: 16 }}> 
        <TextField 
            label={t("create-project-name-label")} 
            required
        />
        <Dropdown
            label={t("create-project-language-label")}
            options={[]}
            required
        />
        <Toggle 
            label={<>
                {`${t("create-project-privacy-label")} `}
                <TooltipHost content={t("create-project-privacy-text")}>
                    <Icon iconName="Info" aria-label="info" />
                </TooltipHost>    
            </>} 
            defaultChecked 
            onText={t("create-project-privacy-on")} 
            offText={t("create-project-privacy-off")} 
        />

    </Stack>
}