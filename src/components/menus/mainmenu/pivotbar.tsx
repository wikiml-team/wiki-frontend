import { useTranslation } from "react-i18next";
import {
  FontSizes,
  IPivotStyles,
  ISeparatorStyles,
  IStackProps,
  Pivot,
  PivotItem,
  Separator,
  Stack,
  useTheme,
} from "@fluentui/react";
import Tab from "./pivottab";
import { PivotTabs } from "./maintabs";
import PagesTabs from "../pagestabs";

type PivotBarProps = {
  tabs: PivotTabs[];
};

export default function PivotBar(props: PivotBarProps) {
  // STYLES
  const palette = useTheme().palette;

  // Pivot Styles
  const pivotStyles: Partial<IPivotStyles> = {
    root: {
      height: 34,
      backgroundColor: palette.themePrimary,
    },
    link: {
      height: "inherit",
      backgroundColor: palette.themePrimary,
      color: palette.white,
      fontSize: FontSizes.small,
      ":hover": {
        backgroundColor: palette.themeDarkAlt,
        color: palette.white,
      },
      ":active": {
        backgroundColor: palette.themeDark,
        color: palette.white,
      },
      ":focus": {
        backgroundColor: palette.themePrimary,
        color: palette.white,
      },
    },
    linkIsSelected: {
      height: "inherit",
      backgroundColor: palette.neutralLighter + " !important",
      color: palette.black + " !important",
    },
  };

  const stackProps: Partial<IStackProps> = {
    horizontal: true,
    styles: {
      root: {
        height: 34,
        position: "fixed",
        bottom: 0,
        zIndex: 999,
        width: "100%",
        backgroundColor: palette.neutralLight,
      },
    },
  };

  const separatorStyles: Partial<ISeparatorStyles> = {
    root: {
      "::after": {
        backgroundColor: palette.neutralQuaternary,
      },
    },
  };

  // LOGIC
  const { tabs } = props;

  const { t } = useTranslation("menu");

  return (
    <Pivot
      aria-label="Main menu tabs"
      linkFormat="tabs"
      defaultSelectedKey="1"
      styles={pivotStyles}
    >
      {tabs.map((tab) => {
        return (
          <PivotItem key={tab.key} headerText={t(tab.name)} itemIcon={tab.icon}>
            <Tab>{tab.render}</Tab>
            <Stack {...stackProps}>
              <PagesTabs tabs={tab.childtabs} addButton={tab.addtabs} />
              <Separator vertical styles={separatorStyles} />
              {/* Here goes the horizontal scrollbar when needed for the page */}
            </Stack>
            {/* Maybe here should go the body */}
          </PivotItem>
        );
      })}
    </Pivot>
  );
}
