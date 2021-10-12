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
                    label={t("stakeholder-label")}
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

export function LogicModelOutputSintaxFormPanel() {
    const { t } = useTranslation("logicmodel-activitymatrix-form");

    return (
        <Stack tokens={{ childrenGap: 16 }}>
            <Stack.Item>
                {t("output-panel-explanation")}
                <br /><br />
            </Stack.Item>

            <Stack.Item>
                <TextField
                    label={t("panel-what-label")}
                />
            </Stack.Item>

            <Stack.Item>
                <TextField
                    label={t("panel-topic-label")}
                />
            </Stack.Item>

            <Stack.Item>
                <TextField
                    label={t("panel-verb-label")}
                />
            </Stack.Item>

            <Stack.Item>
                <Dropdown
                    options={[]}
                    label={t("panel-to-whom-label")}
                />
            </Stack.Item>
        </Stack>
    )
}

export function LogicModelOutcomeSintaxFormPanel() {
    const { t } = useTranslation("logicmodel-activitymatrix-form");

    return (
        <Stack tokens={{ childrenGap: 16 }}>
            <Stack.Item>
                {t("outcome-panel-explanation")}
                <br /><br />
            </Stack.Item>

            <Stack.Item>
                <Dropdown
                    options={[]}
                    label={t("panel-direction-label")}
                />
            </Stack.Item>

            <Stack.Item>
                <TextField
                    label={t("panel-what-label")}
                />
            </Stack.Item>

            <Stack.Item>
                <Dropdown
                    options={[]}
                    label={t("panel-by-whom-label")}
                />
            </Stack.Item>

            <Stack.Item>
                <TextField
                    label={t("panel-where-label")}
                />
            </Stack.Item>
        </Stack>
    )
}
