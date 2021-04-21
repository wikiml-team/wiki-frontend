import { useTranslation } from "react-i18next";
import {
  FontSizes,
  IconButton,
  IPivotStyles,
  IStackProps,
  Pivot,
  PivotItem,
  Stack,
  useTheme,
} from "@fluentui/react";
import Tab from "./pivottab";
import PagesTabs from "../pagestabs";

export type PivotTabsProps = {
  id: number;
  header: string;
  icon: string;
  render?: JSX.Element;
  childtabs?: PivotTabsProps[];
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
      color: palette.white,
      fontSize: FontSizes.small,
      selectors: {
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
        position: "fixed",
        bottom: 0,
        zIndex: 999,
        width: "100%",
        backgroundColor: palette.neutralLight,
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
          <PivotItem
            key={tab.id}
            headerText={t(tab.header)}
            itemIcon={tab.icon}
          >
            <Tab>{tab.render}</Tab>
            <Stack {...stackProps}>
              {console.log(tab.id, tab.childtabs)}
              <PagesTabs tabs={tab.childtabs} />
              <IconButton iconProps={{ iconName: "CircleAddition" }} />
            </Stack>
            {/* Maybe here should go the body */}
          </PivotItem>
        );
      })}
    </Pivot>
  );
}
