import {
  ISeparatorStyles,
  IStackProps,
  PivotItem,
  Separator,
  Stack,
  useTheme,
} from "@fluentui/react";

import { PivotTabs } from "../mainmenu/maintabs";
import PagesTabs from "./pagestabs";

type PagesBarProps = {
  tab: PivotTabs;
  defaultKey?: string;
  getTabId: (itemKey: string, index: number) => string;
  handleOnClick: (parentkey: string, item?: PivotItem) => void;
};

export default function PagesBar(props: PagesBarProps) {
  const { tab, handleOnClick, getTabId, defaultKey } = props;

  // STYLES
  const palette = useTheme().palette;

  const stackProps: Partial<IStackProps> = {
    horizontal: true,
    styles: {
      root: {
        height: 34,
        position: "fixed",
        bottom: 0,
        zIndex: 999,
        width: "100%",
        backgroundColor: palette.neutralLight,
      },
    },
  };

  const separatorStyles: Partial<ISeparatorStyles> = {
    root: {
      "::after": {
        backgroundColor: palette.neutralQuaternary,
      },
    },
  };

  return (
    <Stack {...stackProps}>
      <PagesTabs
        tabs={tab.childtabs}
        addButton={tab.addtabs}
        parentKey={tab.key}
        defaultKey={defaultKey}
        handleOnClick={handleOnClick}
        getTabId={getTabId}
      />
      <Separator vertical styles={separatorStyles} />
      {/* Here goes the horizontal scrollbar when needed for the page */}
    </Stack>
  );
}
