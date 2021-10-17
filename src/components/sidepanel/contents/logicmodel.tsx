import { useTranslation } from 'react-i18next';

import {
    Stack,
    TextField,
    Dropdown
} from "@fluentui/react";

export function LMOutputSintaxPanelContent() {
    const { t } = useTranslation("forms", { keyPrefix: "logicmodel.panel"});

    return (
        <Stack tokens={{ childrenGap: 16 }}>
            <Stack.Item>
                {t("output-explanation")}
                <br /><br />
            </Stack.Item>

            <Stack.Item>
                <TextField
                    label={t("what-label")}
                />
            </Stack.Item>

            <Stack.Item>
                <TextField
                    label={t("topic-label")}
                />
            </Stack.Item>

            <Stack.Item>
                <TextField
                    label={t("verb-label")}
                />
            </Stack.Item>

            <Stack.Item>
                <Dropdown
                    options={[]}
                    label={t("towhom-label")}
                />
            </Stack.Item>
        </Stack>
    )
}

export function LMOutcomeSintaxPanelContent() {
    const { t } = useTranslation("forms", { keyPrefix: "logicmodel.panel"});

    return (
        <Stack tokens={{ childrenGap: 16 }}>
            <Stack.Item>
                {t("outcome-explanation")}
                <br /><br />
            </Stack.Item>

            <Stack.Item>
                <Dropdown
                    options={[]}
                    label={t("direction-label")}
                />
            </Stack.Item>

            <Stack.Item>
                <TextField
                    label={t("what-label")}
                />
            </Stack.Item>

            <Stack.Item>
                <Dropdown
                    options={[]}
                    label={t("bywhom-label")}
                />
            </Stack.Item>

            <Stack.Item>
                <TextField
                    label={t("where-label")}
                />
            </Stack.Item>
        </Stack>
    )
}
