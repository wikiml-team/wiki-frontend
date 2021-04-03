import React from "react";
import {
  FontSizes,
  IPivotStyles,
  Pivot,
  PivotItem,
  useTheme,
} from "@fluentui/react";
import Tab from "./pivottab";

export type PivotTabsProps = {
  id: number;
  header: string;
  icon: string;
  render?: JSX.Element;
};

type PivotBarProps = {
  tabs: PivotTabsProps[];
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
      color: "white",
      fontSize: FontSizes.small,
      selectors: {
        ":hover": {
          backgroundColor: palette.themeDarkAlt,
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
    },
    linkIsSelected: {
      height: "inherit",
      backgroundColor: palette.neutralLighter,
      color: palette.black,
      selectors: {
        ":hover": {
          backgroundColor: palette.neutralLighter,
          color: palette.black,
        },
      },
    },
  };

  // LOGIC
  const { tabs } = props;

  return (
    <Pivot
      aria-label="Main menu tabs"
      linkFormat="tabs"
      defaultSelectedKey="1"
      styles={pivotStyles}
    >
      {tabs.map((tab) => {
        return (
          <PivotItem key={tab.id} headerText={tab.header} itemIcon={tab.icon}>
            <Tab>{tab.render}</Tab>
          </PivotItem>
        );
      })}
    </Pivot>
  );
}
