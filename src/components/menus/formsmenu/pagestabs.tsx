import React from "react";
import { useTranslation } from "react-i18next";
import {
  FontSizes,
  FontWeights,
  IPivotStyles,
  Pivot,
  PivotItem,
  useTheme,
} from "@fluentui/react";

import { PivotTabs } from "../mainmenu/maintabs";
import AddButton from "./addbutton";

type PagesTabProps = {
  tabs?: PivotTabs[];
  addButton?: boolean;
  defaultKey?: string;
  parentKey: string;
  getTabId: (itemKey: string, index: number) => string;
  handleOnClick: (parentkey: string, item?: PivotItem) => void;
};

export default function PagesTabs(props: PagesTabProps) {
  const {
    tabs,
    addButton,
    handleOnClick,
    getTabId,
    parentKey,
    defaultKey,
  } = props;

  const { t } = useTranslation("pages");

  // STYLES
  const { palette } = useTheme();
  const pivotStyles: Partial<IPivotStyles> = {
    root: {
      height: 34,
      backgroundColor: palette.neutralLight,
    },
    link: {
      height: "inherit",
      backgroundColor: palette.neutralLight,
      color: palette.black,
      fontSize: FontSizes.small,
      ":hover": {
        backgroundColor: palette.neutralQuaternaryAlt,
        color: palette.black,
      },
      ":active": {
        backgroundColor: palette.neutralTertiaryAlt,
        color: palette.black,
      },
      ":focus": {
        backgroundColor: palette.neutralQuaternaryAlt,
        color: palette.black,
      },
    },
    linkIsSelected: {
      height: "inherit",
      backgroundColor: palette.neutralTertiaryAlt + " !important",
      color: palette.black + " !important",
      fontWeight: FontWeights.semibold + " !important",
    },
  };

  return (
    <React.Fragment>
      <Pivot
        linkFormat="tabs"
        styles={pivotStyles}
        aria-label="Pages Pivot"
        selectedKey={defaultKey}
        onLinkClick={(
          item?: PivotItem,
          ev?: React.MouseEvent<HTMLElement, MouseEvent>
        ) => handleOnClick(parentKey, item)}
        headersOnly={true}
        getTabId={getTabId}
      >
        {tabs &&
          tabs.map((tab) => {
            return (
              <PivotItem
                key={tab.key}
                headerText={t(tab.name)}
                itemKey={tab.key}
                itemIcon={tab.icon}
              >
                {tab.render}
              </PivotItem>
            );
          })}
      </Pivot>
      {addButton && <AddButton />}
    </React.Fragment>
  );
}
