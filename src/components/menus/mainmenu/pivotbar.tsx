import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTransition, animated } from "react-spring"
import {
  FontSizes,
  IPivotStyles,
  Pivot,
  PivotItem,
  useTheme,
} from "@fluentui/react";

import ToolBar from "./toolbar";
import FormsMenu from "../formsmenu";
import { PageContainer } from "components/styled/pagecontainer";
import IWorkplaceConfiguration, { PivotTabs } from "models/workplace";
import { selectWorkplaceConfig, setLatestFormTab, setConfiguration } from "store/slices/workplaceslice";

type PivotBarProps = {
  tabs: PivotTabs[];
};

export default function PivotBar(props: PivotBarProps) {
  const { tabs } = props;

  // STYLES
  const { palette } = useTheme();

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

  // LOGIC
  const { t } = useTranslation("menu");


  // Tabs State
  const dispatch = useDispatch();

  const { latestMenuTab, latestFormTab, configuration }: IWorkplaceConfiguration = useSelector(selectWorkplaceConfig);

  const getTabId = (itemKey: string) => {
    return `pivot_${itemKey}`;
  };

  const handlePageTabOnClick = (parentkey: string, item?: PivotItem) => {
    if (item) {
      const itemkey = item.props.itemKey!;

      // Update current page
      dispatch(setLatestFormTab({ tab: itemkey }));

      // Update current configuration
      dispatch(setConfiguration({ key: parentkey, formtab: itemkey, render: item.props.children }))
    }
  };

  // Tollbar Animation Controls
  const [fixToolBar, setFixToolBar] = useState(true)

  const [showToolBar, setShowToolBar] = useState(true)
  const toolBarTransition = useTransition(showToolBar, {
    from: { x: 0, y: -10, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 0, y: -10, opacity: 0 },
  })

  const handleToolbarOnClose = (item: any) => {
    setShowToolBar(false);
    setFixToolBar(false);
  }

  const handleToolbarOnFix = (item: any) => {
    setFixToolBar(true);
  }

  return (
    <React.Fragment>

      <Pivot
        aria-label="Main menu tabs"
        linkFormat="tabs"
        defaultSelectedKey="1"
        styles={pivotStyles}
        onLinkClick={(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => setShowToolBar(true)}
      >
        {tabs.map((tab) => {
          return (
            <PivotItem key={tab.key} headerText={t(tab.name)} itemIcon={tab.icon}>

              {toolBarTransition(
                (style: any, item: any) => item &&
                  <animated.div style={style}><ToolBar isFixed={fixToolBar} handleOnClose={handleToolbarOnClose} handleOnFix={handleToolbarOnFix}>{tab.render}</ToolBar></animated.div>
              )}

              <PageContainer
              >
                {configuration[tab.key].render}
              </PageContainer>

              <FormsMenu
                tab={tab}
                defaultKey={configuration[tab.key].formtab}
                handleOnClick={handlePageTabOnClick}
                getTabId={getTabId}
              />
            </PivotItem>
          );
        })}
      </Pivot>
    </React.Fragment>
  );
}
