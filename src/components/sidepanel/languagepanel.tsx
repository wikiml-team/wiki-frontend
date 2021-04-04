import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Dropdown, Stack } from "@fluentui/react";

import { setLanguage, selectLang } from "languages/languageSlice";

export default function LanguagePanel() {
  const { t } = useTranslation(["sidepanel", "lenguages"]);
  const lang = useSelector(selectLang);
  console.log("current lang: ", lang);

  const dispatch = useDispatch();

  const handleDataOnChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: any
  ) => {
    dispatch(setLanguage(item.key));
  };

  const suportedLangs = [
    { key: "en", text: t("lenguages:en") },
    { key: "es", text: t("lenguages:es") },
    { key: "de", text: t("lenguages:de") },
  ];

  return (
    <Stack gap={25}>
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
