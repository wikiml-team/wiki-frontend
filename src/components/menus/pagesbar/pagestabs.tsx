import React from "react";
import { useTranslation } from "react-i18next";
import { Pivot, PivotItem, useTheme } from "@fluentui/react";

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
  const palette = useTheme().palette;

  return (
    <React.Fragment>
      <Pivot
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
              />
            );
          })}
      </Pivot>
      {addButton && <AddButton />}
    </React.Fragment>
  );
}
