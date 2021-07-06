import {
  ISeparatorStyles,
  IStackProps,
  PivotItem,
  Separator,
  Stack,
  useTheme,
} from "@fluentui/react";

import { PivotTabs } from "pages/methodologies/canadian/maintabs";
import PagesTabs from "./pagestabs";
import FormsTabs from "./formstabs";

type FormsMenuProps = {
  tab: PivotTabs;
  defaultKey?: string;
  getTabId: (itemKey: string, index: number) => string;
  handleOnClick: (parentkey: string, item?: PivotItem) => void;
};

export default function FormsMenu(props: FormsMenuProps) {
  const { tab, handleOnClick, getTabId, defaultKey } = props;

  // STYLES
  const { palette } = useTheme();

  const stackProps: IStackProps = {
    horizontal: true,
    styles: {
      root: {
        height: 34,
        width: "100%",
        boxSizing: "border-box",
        position: "fixed",
        bottom: 0,
        zIndex: 999,
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
