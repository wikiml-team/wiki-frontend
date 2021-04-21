import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActionButton,
  FontSizes,
  IButtonStyles,
  OverflowSet,
  useTheme,
} from "@fluentui/react";

import { PivotTabs } from "../mainmenu/maintabs";
import AddButton from "./addbutton";
import OverflowButton from "./overflowbutton";

type PagesTabProps = {
  tabs?: PivotTabs[];
  addButton?: boolean;
};

const noOp = () => undefined;

export default function PagesTabs(props: PagesTabProps) {
  const { tabs, addButton } = props;

  const { t } = useTranslation("instruments");
  const palette = useTheme().palette;

  const [items, setItems] = useState<PivotTabs[]>([]);
  const [overflowItems, setOverflowItems] = useState<PivotTabs[]>([]);

  const handleOverflowItemsOnClick = (event: any, item: PivotTabs) => {
    var newoverflow: PivotTabs;
    setItems((previtems) => {
      newoverflow = previtems.pop() as PivotTabs;

      item.onClick = noOp;
      return [item, ...previtems];
    });

    setOverflowItems((previtems) => {
      let arr = previtems?.filter((it) => it.key !== item.key) as PivotTabs[];

      newoverflow.onClick = handleOverflowItemsOnClick;
      arr.push(newoverflow);

      return arr;
    });
  };

  useEffect(() => {
    const i = 5;
    const initTabs = tabs?.slice(0, i) as PivotTabs[];
    initTabs.forEach((tab) => {
      tab.onClick = noOp;
      tab.name = t(tab.name);
    });
    setItems(initTabs);

    const initMenu = tabs?.slice(i) as PivotTabs[];
    initMenu.forEach((tab) => {
      tab.onClick = handleOverflowItemsOnClick;
      tab.name = t(tab.name);
    });
    setOverflowItems(initMenu);
  }, []);

  const onRenderItem = (item: any): JSX.Element => {
    const buttonStyles: Partial<IButtonStyles> = {
      root: {
        height: "inherit",
        padding: "0 5px",
        alignSelf: "stretch",
        color: "black",
        fontSize: FontSizes.size12,
        selectors: {
          ":hover": {
            backgroundColor: palette.neutralQuaternaryAlt,
            color: palette.black,
          },
          ":active": {
            backgroundColor: palette.neutralTertiaryAlt,
            color: palette.black,
          },
          ":focus": {
            backgroundColor: palette.neutralLight,
            color: palette.black,
          },
        },
      },
      rootHovered: {
        backgroundColor: palette.neutralQuaternaryAlt,
        color: palette.black,
      },
      rootFocused: {
        backgroundColor: palette.neutralTertiaryAlt,
      },
      icon: {
        fontSize: FontSizes.size12,
        color: palette.black,
      },
      iconHovered: {
        color: palette.black,
      },
      iconPressed: {
        // backgroundColor: palette.blue,
      },
    };
    return (
      <ActionButton
        iconProps={{ iconName: item.icon }}
        styles={buttonStyles}
        onClick={item.onClick}
      >
        {item.name}
      </ActionButton>
    );
  };

  return (
    <React.Fragment>
      <OverflowSet
        aria-label="Pages tabs"
        role="menubar"
        items={items}
        overflowItems={overflowItems}
        onRenderOverflowButton={OverflowButton}
        onRenderItem={onRenderItem}
      />
      {addButton && <AddButton />}
    </React.Fragment>
  );
}
