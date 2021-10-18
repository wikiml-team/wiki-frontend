import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import {
    Dropdown,
    Icon,
    Stack,
    Text,
    TextField,
    Toggle,
    TooltipHost
} from '@fluentui/react';

import CustomDialog from './custom';

type NewProjectCalloutProps = {
    hideDialog: boolean,
    toggleHideDialog: () => void,
    methodologyId: string
}

export default function NewProjectDialog(props: NewProjectCalloutProps) {

    // LOGIC
    const { hideDialog, toggleHideDialog, methodologyId } = props;

    const { t } = useTranslation("commands", { keyPrefix: "new" })
    const history = useHistory()

    const handleAccpetButtonOnClick = (option: string) => {
        toggleHideDialog()
        alert(`Created project with methodology ${methodologyId}`)
        history.push(`/workplace/${methodologyId}/1`)
    }

    return <CustomDialog
        dialogContentProps={{ title: t("header") }}
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        primaryButtonText={t("accept-label")}
        acceptOnClick={handleAccpetButtonOnClick}
        optionalBody={<NewProjectDialogBody methodologyId={methodologyId} />}
    />
}

type NewProjectDialogBodyProps = {
    methodologyId: string
}

function NewProjectDialogBody(props: NewProjectDialogBodyProps) {

    const { methodologyId } = props
    const { t } = useTranslation("commands", { keyPrefix: "new.body" })

    return (
        <Stack tokens={{ childrenGap: 16 }}>
            <Text variant="medium">{t("text")} {methodologyId}</Text>
            <TextField
                required
                label={t("name-label")}
                placeholder={t("name-placeholder")}
            />
            <Dropdown
                required
                label={t("language-label")}
                placeholder={t("language-placeholder")}
                options={[]}
            />
            <Toggle
                label={<>
                    {t("privacy-label")}{' '}
                    <TooltipHost content={t("privacy-text")}>
                        <Icon iconName="Info" aria-label="info" />
                    </TooltipHost>
                </>}
                defaultChecked
                onText={t("privacy-on")}
                offText={t("privacy-off")}
            />
        </Stack>
    )
}
