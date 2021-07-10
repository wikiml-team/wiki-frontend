import { useDispatch } from "react-redux";
import {
  ISeparatorStyles,
  IStackProps,
  PivotItem,
  Separator,
  Stack,
  Sticky,
  useTheme,
} from "@fluentui/react";

import PagesTabs from "./pagestabs";
import AddButton from "./addbutton";
import { tabSchema } from "models/workplace";
import { setConfiguration } from "store/slices/workplaceslice";

type FooterProps = {
  tab: tabSchema;
  selectedkey: string;
};

export default function Footer(props: FooterProps) {

  const { tab, selectedkey } = props;

  // STYLES
  const { palette } = useTheme();

  const stackProps: IStackProps = {
    horizontal: true,
    styles: {
      root: {
        height: 34,
        position: "fixed",
        bottom: 0,
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

  // LOGIC
  const dispatch = useDispatch();

  const handleTabOnClick = (parentkey: string, item?: PivotItem) => {
    if (item) {
      const itemkey = item.props.itemKey!;

      // Update current configuration
      dispatch(setConfiguration({ key: parentkey, formtab: itemkey, render: item.props.children }))
    }
  };

  return (
    <Stack {...stackProps}>
      <PagesTabs
        tabs={tab.childtabs}
        parentKey={tab.key}
        defaultKey={selectedkey}
        handleOnClick={handleTabOnClick}
      />
      {tab.addtabs && <AddButton />}

      <Separator vertical styles={separatorStyles} />

      {/* Here goes the horizontal scrollbar when needed for the page */}
    </Stack>
  );
}