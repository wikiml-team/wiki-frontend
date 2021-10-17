import { useTranslation } from 'react-i18next';

import {
    Stack,
    TextField,
    Dropdown
} from "@fluentui/react";

export function AddStakehoderPanelContent() {
    const { t } = useTranslation("forms", { keyPrefix: "stakeholders.panel"});

    return (
        <Stack tokens={{ childrenGap: 16 }}>
            <Stack.Item>
                {t("explanation")}
                <br /><br />
            </Stack.Item>

            <Stack.Item>
                <TextField
                    label={t("name-label")}
                />
            </Stack.Item>

            <Stack.Item>
                <Dropdown
                    options={[]}
                    label={t("country-label")}
                />
            </Stack.Item>
        </Stack>
    )
}