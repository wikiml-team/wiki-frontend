import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useId } from '@fluentui/react-hooks';

import {
    Dropdown,
    Icon,
    Label,
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
    methodology: {id: string, name: string}

}

export default function NewProjectDialog(props: NewProjectCalloutProps) {

    // LOGIC
    const { hideDialog, toggleHideDialog, methodology } = props;

    const { t } = useTranslation("commands", { keyPrefix: "new" })
    const history = useHistory()

    const handleAccpetButtonOnClick = (option: string) => {
        toggleHideDialog()
        alert(`Created project with methodology ${methodology.id}`)
        history.push(`/workplace/${methodology.id}/1`)
    }

    return <CustomDialog
        dialogContentProps={{ title: t("header") }}
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        primaryButtonText={t("accept-label")}
        acceptOnClick={handleAccpetButtonOnClick}
        optionalBody={<NewProjectDialogBody name={methodology.name} />}
    />
}

type NewProjectDialogBodyProps = {
    name: string
}

function NewProjectDialogBody(props: NewProjectDialogBodyProps) {

    const { name } = props
    const { t } = useTranslation("commands", { keyPrefix: "new.body" })

    const elem = useId();

    return (
        <Stack tokens={{ childrenGap: 16 }}>
            <Label >Methodology</Label>
            <Text variant="medium" styles={{root: { marginTop: "1px !important"}}}>{name}</Text>
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
