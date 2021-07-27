import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  FontSizes,
  IPivotStyles,
  Pivot,
  PivotItem,
  useTheme,
} from "@fluentui/react";

import { TabSchema } from "models/workplace";
import { setLatestMenuTab } from "store/slices/workplaceslice";

type PivotBarProps = {
  schema: TabSchema;
  setShowToolBar: Function;
};

export default function PivotBar(props: PivotBarProps) {
  const { schema, setShowToolBar } = props;
  const { tabs } = schema;

  // STYLES
  const { palette } = useTheme();

  const pivotStyles: Partial<IPivotStyles> = {
    root: {
      height: 34,
      backgroundColor: palette.themePrimary,
      zIndex: 10,
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

  // LOGIC
  const { t } = useTranslation("menu");

  // Tabs State
  const dispatch = useDispatch();

  const handleMenuOnClick = (item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => {
    setShowToolBar(true)

    if (item) {
      const itemkey = item.props.itemKey!;
      // Update current menu tab
      dispatch(setLatestMenuTab({ tab: itemkey }));
    }
  }

  return (
    <Pivot
      linkFormat="tabs"
      defaultSelectedKey="key2"
      styles={pivotStyles}
      onLinkClick={handleMenuOnClick}
    >
      {tabs.map((tab) => {
        return (
          <PivotItem
            key={tab.key}
            itemKey={tab.key}
            headerText={t(tab.name)}
            itemIcon={tab.icon}
          />
        );
      })}
    </Pivot>
  );
}
