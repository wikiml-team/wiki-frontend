import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Dropdown,
  IDropdownOption,
  IStackTokens,
  Stack,
} from "@fluentui/react";

import { setLanguage, selectLanguage } from "store/slices/languageslice";

export default function LanguagePanel() {
  const { t } = useTranslation(["sidepanel", "lenguages"]);
  const lang = useSelector(selectLanguage);

  const dispatch = useDispatch();

  const handleDataOnChange = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption<any>
  ) => {
    if (item) dispatch(setLanguage(item.key));
  };

  const stackTokens: IStackTokens = { childrenGap: 20 };

  const suportedLangs = [
    { key: "en", text: t("lenguages:en") },
    { key: "es", text: t("lenguages:es") },
    { key: "de", text: t("lenguages:de") },
  ];

  return (
    <Stack tokens={stackTokens}>
      <Dropdown
        label={t("langUI")}
        defaultSelectedKey={lang ? lang : undefined}
        placeholder={t("selectlang")}
        options={suportedLangs}
        onChange={handleDataOnChange}
      />
      <Dropdown
        label={t("langdata")}
        placeholder={t("selectlang")}
        options={suportedLangs}
        onChange={() => {}}
      />
    </Stack>
  );
}
