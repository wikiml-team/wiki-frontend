import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FontSizes,
  IPivotStyles,
  Pivot,
  PivotItem,
  useTheme,
} from "@fluentui/react";

import { PivotTabs } from "./maintabs";
import ToolBar from "./toolbar";
import PagesBar from "../pagesbar";
import GeneralForm from "pages/methodologies/canadian/generalform";

type Dic = {
  [index: string]: string;
};

type PivotBarProps = {
  tabs: PivotTabs[];
};

export default function PivotBar(props: PivotBarProps) {
  // STYLES
  const palette = useTheme().palette;

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

  const [selectedPages, setSelectedPages] = useState<Dic>({
    key1: "key1",
    key2: "key1",
    key3: "key1",
    key4: "key1",
    key5: "key1",
    key6: "key1",
  });

  const [currentPage, setCurrentPage] = useState("key1");
  const [pageToRender, setPageToRender] = useState<ReactNode>(<GeneralForm />);

  const getTabId = (itemKey: string) => {
    return `pivot_${itemKey}`;
  };

  const handlePageTabOnClick = (parentkey: string, item?: PivotItem) => {
    if (item) {
      let newState = selectedPages;
      newState[parentkey] = item.props.itemKey!;
      setSelectedPages(newState);
      setCurrentPage(item.props.itemKey!);

      setPageToRender(item.props.children);
    }
  };

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
            <ToolBar>{tab.render}</ToolBar>

            <div aria-labelledby={getTabId(currentPage)} role="tabpanel">
              {pageToRender}
            </div>

            <PagesBar
              tab={tab}
              defaultKey={selectedPages[tab.key]}
              handleOnClick={handlePageTabOnClick}
              getTabId={getTabId}
            />
          </PivotItem>
        );
      })}
    </Pivot>
  );
}
