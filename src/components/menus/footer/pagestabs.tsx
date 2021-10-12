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

import { Tab } from "models/workplace";

type PagesTabProps = {
  tabs?: Tab[];
  defaultKey?: string;
  parentKey: string;
  onClick: (parentkey: string, item?: PivotItem) => void;
};

export default function PagesTabs(props: PagesTabProps) {

  // LOGIC
  const { tabs, onClick, parentKey, defaultKey, } = props;

  const { t } = useTranslation("pages");

  const handleMenuOnClick = (item?: PivotItem, ev?: React.MouseEvent<HTMLElement, MouseEvent>) => onClick(parentKey, item)

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
    <Pivot
      linkFormat="tabs"
      selectedKey={defaultKey}
      styles={pivotStyles}
      onLinkClick={handleMenuOnClick}
      headersOnly={true}
    >
      {tabs &&
        tabs.map((tab) => {
          return (
            <PivotItem
              key={tab.key}
              itemKey={tab.key}
              headerText={t(tab.name)}
              itemIcon={tab.icon}
            >
              {tab.render}
            </PivotItem>
          );
        })}
    </Pivot>
  );
}
