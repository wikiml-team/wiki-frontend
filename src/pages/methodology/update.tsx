import { useTranslation } from 'react-i18next'

import { Checkbox, Dropdown, IStackProps, IStackStyles, Label, Position, SpinButton, Stack, TextField } from '@fluentui/react'
import { useSelector } from 'react-redux'
import { selectLanguage, selectSupportedLanguages } from 'store/slices/languageslice'

export default function UpdateMethodology() {

    const { t } = useTranslation("manage", { keyPrefix: "form" })
    const t_basics = useTranslation("basics", { keyPrefix: "languages" }).t

    const lang = useSelector(selectLanguage);
    const supportedLanguages = useSelector(selectSupportedLanguages);


    const suportedLangs = supportedLanguages.map(key => {
        return {
            key: key,
            text: t_basics(key)
        }
    })

    const hstackProps: IStackProps = {
        horizontal: true,
        tokens: {
            childrenGap: 10
        }
    }

    return (
        <Stack tokens={{ childrenGap: 12 }}>
            <Stack {...hstackProps}>
                <Stack.Item>

                    {/* Maximal Amount <> */}
                    <SpinButton
                        label={t("amount.maximal-field")}
                        defaultValue="0"
                        min={0}
                        max={100}
                        step={1}
                        incrementButtonAriaLabel="Increase value by 1"
                        decrementButtonAriaLabel="Decrease value by 1"
                        labelPosition={Position.top}
                    // styles={styles}
                    />
                </Stack.Item>
                <Stack.Item>
                    {/* Minimal Amount <> */}
                    <SpinButton
                        label={t("amount.minimal-field")}
                        defaultValue="0"
                        min={0}
                        max={100}
                        step={1}
                        incrementButtonAriaLabel="Increase value by 1"
                        decrementButtonAriaLabel="Decrease value by 1"
                        labelPosition={Position.top}
                    // styles={styles}
                    />
                </Stack.Item>
                <Stack.Item >
                    {/* Top Amount [] */}
                    <Label>{t("amount.top-field")}</Label>
                    <Checkbox />
                </Stack.Item>
            </Stack>

            <Stack {...hstackProps}>
                <Stack.Item>

                    {/* Maximal Characters <> */}
                    <SpinButton
                        label={t("characters.maximal-field")}
                        defaultValue="0"
                        min={0}
                        max={100}
                        step={1}
                        incrementButtonAriaLabel="Increase value by 1"
                        decrementButtonAriaLabel="Decrease value by 1"
                        labelPosition={Position.top}
                    // styles={styles}
                    />
                </Stack.Item>

                {/* Top Characters [] */}
                <Stack.Item>
                    <Label>{t("characters.top-field")}</Label>
                    <Checkbox />
                </Stack.Item>
            </Stack>

            {/* Language select*/}
            <Dropdown
                label={t("language-field")}
                defaultSelectedKey={lang}
                // placeholder={t("language-select")}
                options={suportedLangs}
            />

            {/* Label name */}
            <TextField label={t("name-field")} />

            {/* Tooltip */}
            <TextField label={t("tooltip-field")} />

            {/* Definition */}
            <TextField label={t("definition-field")} />

            {/* Format */}
            <TextField label={t("format-field")} />
        </Stack>
    )
}
