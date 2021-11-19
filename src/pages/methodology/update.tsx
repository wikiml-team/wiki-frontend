import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import i18n from "i18n";

import {
  Checkbox,
  Dropdown,
  IStackProps,
  Label,
  Position,
  SpinButton,
  Stack,
  TextField,
} from "@fluentui/react";

import {
  selectLanguage,
  selectSupportedLanguages,
} from "store/slices/languageslice";
import { Title } from "components/styled/text";

export default function UpdateMethodology() {
  // LOGIC
  const { t } = useTranslation("manage", { keyPrefix: "form" });
  const { t: t_basics } = useTranslation("basics", { keyPrefix: "languages" });

  const { form } = useParams<{ form: string }>();

  const isIndex = form?.includes("index") ? true : false;

  // Language
  const lang = useSelector(selectLanguage);
  const supportedLanguages = useSelector(selectSupportedLanguages);

  const suportedLangs = supportedLanguages.map((key) => {
    return {
      key: key,
      text: t_basics(key),
    };
  });

  let i18ncopy = i18n.cloneInstance({
    defaultNS: "forms",
    fallbackNS: ["licitations", "tutorials"],
  });

  // STYLES
  const hstackProps: IStackProps = {
    horizontal: true,
    tokens: {
      childrenGap: 10,
    },
  };

  return (
    <Stack
      tokens={{ childrenGap: 12 }}
      styles={{ root: { marginBottom: 8, paddingRight: 40 } }}
    >
      <Title>{isIndex ? t("index") : i18ncopy.t(`${form}.header`)}</Title>
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
        <Stack.Item>
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
  );
}
