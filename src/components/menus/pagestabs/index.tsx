import { useTranslation } from "react-i18next";
import {
  FontSizes,
  IPivotStyles,
  Pivot,
  PivotItem,
  useTheme,
} from "@fluentui/react";
import { PivotTabsProps } from "../mainmenu/pivotbar";

type PagesTabProps = {
  tabs?: PivotTabsProps[];
};

export default function PagesTabs(props: PagesTabProps) {
  // STYLES
  const palette = useTheme().palette;

  // Pivot Styles
  const pivotStyles: Partial<IPivotStyles> = {
    root: {
      height: 34,
    },
    link: {
      height: "inherit",
      backgroundColor: palette.neutralLight,
      color: palette.black,
      fontSize: FontSizes.small,
      selectors: {
        ":hover": {
          backgroundColor: palette.neutralQuaternaryAlt,
          color: palette.black,
        },
        ":active": {
          backgroundColor: palette.neutralTertiaryAlt,
          color: palette.black,
        },
        ":focus": {
          backgroundColor: palette.neutralLight,
          color: palette.black,
        },
      },
    },
    linkIsSelected: {
      height: "inherit",
      backgroundColor: palette.neutralTertiaryAlt + " !important",
      color: palette.black + " !important",
    },
  };

  const { tabs } = props;
  const { t } = useTranslation("instruments");

  return (
    <Pivot
      aria-label="Pages tabs"
      linkFormat="tabs"
      defaultSelectedKey="1"
      styles={pivotStyles}
    >
      {tabs &&
        tabs.map((tab) => {
          return (
            <PivotItem
              key={tab.id}
              headerText={t(tab.header)}
              itemIcon={tab.icon}
            />
          );
        })}
    </Pivot>
  );
}
