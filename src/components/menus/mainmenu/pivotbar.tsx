import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  FontSizes,
  IPivotStyles,
  Pivot,
  PivotItem,
  useTheme,
} from "@fluentui/react";

import { setLatestMenuTab, selectWorkplaceConfig } from "store/slices/workplaceslice";
import { TabSchema } from "models/workplace";

type PivotBarProps = {
  schema: TabSchema;
  setShowToolBar: Function;
};

export default function PivotBar(props: PivotBarProps) {
  const { schema, setShowToolBar } = props;
  const { tabs } = schema;

  // LOGIC
  const { t } = useTranslation("menu");
  const history = useHistory()

  // Tabs State
  const dispatch = useDispatch();
  const { latestMenuTab } = useSelector(selectWorkplaceConfig);

  const handleMenuOnClick = (item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => {
    
    if (item) {
      const itemkey = item.props.itemKey!;
      
      // If it is the first key then move to homepage and not update tab_config
      if (itemkey === "key1") {
        history.push("/")
      }
      else {
        // Update current menu tab
        dispatch(setLatestMenuTab({ tabKey: itemkey }));
      }
    }
    setShowToolBar(true)
  }

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

  return (
    <Pivot
      linkFormat="tabs"
      defaultSelectedKey={latestMenuTab !== "key2"? latestMenuTab : "key2"}
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
