import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  Dropdown,
  IDropdownOption,
  IStackProps,
  Stack,
} from "@fluentui/react";

import { setLanguage, selectLanguage, selectSupportedLanguages } from "store/slices/languageslice";

export default function LanguagePanel() {
  const { t } = useTranslation("commands", { keyPrefix: "language"});
  const t_basics = useTranslation("basics", { keyPrefix: "languages"}).t
  
  const lang = useSelector(selectLanguage);
  const supportedLanguages = useSelector(selectSupportedLanguages);

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

  const suportedLangs = supportedLanguages.map(key => {
    return {
      key: key,
      text: t_basics(key)
    }
  })

  return (
    <Stack {...stackProps}>
      <Stack.Item>
        <Dropdown
          label={t("language-ui")}
          defaultSelectedKey={lang}
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
