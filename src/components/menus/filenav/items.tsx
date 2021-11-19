import { useTranslation } from "react-i18next";

import { INavLinkGroup } from "@fluentui/react";

export const GetPrimaryItems = () => {
  const { t } = useTranslation("menuheaders", { keyPrefix: "filemenu" });

  return [
    {
      links: [
        {
          name: t("home"),
          url: "/",
          key: "key_home",
          icon: "Home",
        },
        {
          name: t("new"),
          url: "/new",
          key: "key_new",
          icon: "Page",
          title: `${t("new")} ${t("project")}`,
        },
        {
          name: t("open"),
          url: "/open",
          key: "key_open",
          icon: "OpenFolderHorizontal",
          title: `${t("open")} ${t("project")}`,
        },
      ],
    },
  ] as INavLinkGroup[];
};

export const GetSecondaryItems = () => {
  const { t } = useTranslation("menuheaders", { keyPrefix: "filemenu" });

  return [
    {
      links: [
        {
          name: t("methodologies"),
          url: "/methodologies",
          key: "key_methodologies",
          icon: "StackIndicator",
        },
      ],
    },
  ] as INavLinkGroup[];
};

export const GetFooterItems = () => {
  const { t } = useTranslation("menuheaders", { keyPrefix: "filemenu" });

  return [
    {
      links: [
        {
          name: t("info"),
          url: "/1/info",
          key: "key_info",
        },
        {
          name: t("export"),
          url: "/1/export",
          key: "key_export",
        },
        {
          name: t("print"),
          url: "/1/print",
          key: "key_print",
        },
        {
          name: t("share"),
          url: "/1/share",
          key: "key_share",
        },
        {
          name: t("about"),
          url: "/1/about",
          key: "key_about",
        },
      ],
    },
  ] as INavLinkGroup[];
};
