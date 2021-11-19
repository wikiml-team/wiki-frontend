import i18n from "i18n";
import { useTranslation } from "react-i18next";

import { INavLinkGroup } from "@fluentui/react";

import tabsConfiguration from "pages/forms/canadian/tabsconfiguration";

export const GetItems = () => {
  const { t } = useTranslation("menuheaders", { keyPrefix: "methodology" });

  let i18ncopy = i18n.cloneInstance({
    defaultNS: "forms",
    fallbackNS: ["licitations", "tutorials"],
  });

  const heads = ["project", "licitations", "methodology"];

  const menuSet = heads.map((head) => {
    const links =
      tabsConfiguration.findByName(head).childtabs?.map((tab) => {
        return {
          key: tab.name,
          name: i18ncopy.t(`${tab.name}.header`),
          url: `${tab.name}`,
        };
      }) || [];

    return {
      name: t(head),
      links,
      // isExpanded: true
    } as INavLinkGroup;
  });

  return [
    {
      links: [
        {
          key: "index",
          name: t("index"),
          url: "index",
        },
        ...menuSet,
      ],
    },
  ] as INavLinkGroup[];
};
