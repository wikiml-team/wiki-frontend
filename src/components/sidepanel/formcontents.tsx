import React from 'react'
import { useTranslation } from 'react-i18next';
import {
    Stack,
    TextField,
    Dropdown
} from "@fluentui/react";

export function StakehoderFormPanel() {
    const { t } = useTranslation("stakeholders-form");

    return (
        <Stack tokens={{ childrenGap: 16 }}>
            <Stack.Item>
                {t("panel-explanation")}
                <br /><br />
            </Stack.Item>

            <Stack.Item>
                <TextField
                    ariaLabel={"contentExplanation"}
                    label={t("stakeholder-label")}
                />
            </Stack.Item>

            <Stack.Item>
                <Dropdown
                    options={[]}
                    ariaLabel={"contentExplanation"}
                    label={t("country-label")}
                />
            </Stack.Item>
        </Stack>
    )
}
