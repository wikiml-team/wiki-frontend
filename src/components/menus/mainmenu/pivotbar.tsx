import React, { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTransition, animated } from "react-spring"
import {
  FontSizes,
  IPivotStyles,
  Pivot,
  PivotItem,
  useTheme,
} from "@fluentui/react";

import { PivotTabs } from "./maintabs";
import ToolBar from "./toolbar";
import FormsMenu from "../formsmenu";
import GeneralForm from "pages/methodologies/canadian/projectforms/generalform";
import SpecificationsForm from "pages/methodologies/canadian/licitationforms/specificationsform";
import FormsTutorials from "pages/methodologies/canadian/tutorials/formstutorial";
import { PageContainer } from "components/styled/pagecontainer";

type StringDic = {
  [index: string]: string;
};

type NodeDic = {
  [index: string]: ReactNode;
};

type PivotBarProps = {
  tabs: PivotTabs[];
};

export default function PivotBar(props: PivotBarProps) {
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
  const { tabs } = props;
  const { t } = useTranslation("menu");

  const [fixToolBar, setFixToolBar] = useState(true)

  const [showToolBar, setShowToolBar] = useState(true)
  const toolBarTransition = useTransition(showToolBar, {
    from: { x: 0, y: -10, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 0, y: -10, opacity: 0 },
  })

  const [selectedPageTabs, setSelectedPageTabs] = useState<StringDic>({
    key1: "key1",
    key2: "key1",
    key3: "key1",
    key4: "key1",
    key5: "key1",
    key6: "key1",
  });

  const [lastFormsRendered, setLastFormsRendered] = useState<NodeDic>({
    key1: <React.Fragment />,
    key2: <GeneralForm />,
    key3: <SpecificationsForm />,
    key4: <FormsTutorials />,
    key5: <React.Fragment />,
    key6: <React.Fragment />,
  });

  const [currentPage, setCurrentPage] = useState("key1");


  const getTabId = (itemKey: string) => {
    return `pivot_${itemKey}`;
  };

  const handlePageTabOnClick = (parentkey: string, item?: PivotItem) => {
    if (item) {
      let newTabsState = selectedPageTabs;
      newTabsState[parentkey] = item.props.itemKey!;
      setSelectedPageTabs(newTabsState);
      setCurrentPage(item.props.itemKey!);

      let newFormsRenderedState = lastFormsRendered;
      newFormsRenderedState[parentkey] = item.props.children;
      setLastFormsRendered(newFormsRenderedState);
    }
  };

  const handleTollBarOnClose = (item: any) => {
    setShowToolBar(false);
    setFixToolBar(false);
  }

  const handleTollBarOnFixed = (item: any) => {
    setFixToolBar(true);
  }

  return (
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
                <animated.div style={style}><ToolBar isFixed={fixToolBar} handleOnClose={handleTollBarOnClose} handleOnFix={handleTollBarOnFixed}>{tab.render}</ToolBar></animated.div>
            )}

            <PageContainer
              aria-labelledby={getTabId(currentPage)}
            >
              {lastFormsRendered[tab.key]}
            </PageContainer>

            <FormsMenu
              tab={tab}
              defaultKey={selectedPageTabs[tab.key]}
              handleOnClick={handlePageTabOnClick}
              getTabId={getTabId}
            />
          </PivotItem>
        );
      })}
    </Pivot>
  );
}
