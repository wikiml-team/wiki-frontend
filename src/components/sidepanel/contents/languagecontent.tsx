import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Dropdown,
  IDropdownOption,
  IStackProps,
  Stack,
} from "@fluentui/react";

import { setLanguage, selectLanguage } from "store/slices/languageslice";

export default function LanguagePanel() {
  const { t } = useTranslation(["language-settings", "settings", "languages"]);
  const lang = useSelector(selectLanguage);

  const dispatch = useDispatch();

  const handleDataOnChange = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption<any>
  ) => {
    if (item) dispatch(setLanguage(item.key.toString()));
  };

  const stackProps: IStackProps = {
    tokens: {
      childrenGap: 15
    },
    styles: {
      root: {
        marginTop: 40
      }
    }
  }

  const suportedLangs = [
    { key: "en", text: t("languages:en") },
    { key: "es", text: t("languages:es") },
    { key: "de", text: t("languages:de") },
  ];

  return (
    <Stack {...stackProps}>
      <Stack.Item>
        <Dropdown
          label={t("language-ui")}
          defaultSelectedKey={lang ? lang : undefined}
          placeholder={t("language-select")}
          options={suportedLangs}
          onChange={handleDataOnChange}
        />
      </Stack.Item>
      <Stack.Item>
        <Dropdown
          label={t("language-data")}
          placeholder={t("language-select")}
          options={suportedLangs}
          onChange={() => { }}
        />
      </Stack.Item>
    </Stack>
  );
}
