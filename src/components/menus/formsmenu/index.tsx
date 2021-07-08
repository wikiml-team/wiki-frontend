import {
  ISeparatorStyles,
  IStackProps,
  PivotItem,
  Separator,
  Stack,
  useTheme,
} from "@fluentui/react";

import PagesTabs from "./pagestabs";
import AddButton from "./addbutton";
import { tabSchema } from "models/workplace";

type FormsMenuProps = {
  tab: tabSchema;
  defaultKey?: string;
  getTabId: (itemKey: string, index: number) => string;
  handleOnClick: (parentkey: string, item?: PivotItem) => void;
};

export default function FormsMenu(props: FormsMenuProps) {
  const { tab, handleOnClick, getTabId, defaultKey } = props;

  console.log("tab: ", tab)
  console.log("defaultKey: ", defaultKey)

  // STYLES
  const { palette } = useTheme();

  const stackProps: IStackProps = {
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
        parentKey={tab.key}
        defaultKey={defaultKey}
        handleOnClick={handleOnClick}
        getTabId={getTabId}
      />
      {/* {tab.addtabs && <AddButton />} */}

      {/* <Separator vertical styles={separatorStyles} /> */}

      {/* Here goes the horizontal scrollbar when needed for the page */}
    </Stack>
  );
}
