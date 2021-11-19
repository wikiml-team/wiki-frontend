import { CommandBar, ICommandBarStyles, useTheme } from "@fluentui/react";

import { CustomBarButton } from "./custombuttons";
import { GetItems } from "./items";

export default function SettingsMenu() {
  const { palette } = useTheme();

  const comandBarStyles: ICommandBarStyles = {
    root: {
      height: 40,
      padding: 0,
      backgroundColor: palette.themePrimary,
      ".ms-OverflowSet .ms-OverflowSet-item:nth-child(2)": {
        borderRight: `1px solid ${palette.white}`,
      },
    },
  };

  // DATA
  const _items = GetItems()

  return (
    <CommandBar
      buttonAs={CustomBarButton}
      items={_items}
      ariaLabel="Use left and right arrow keys to navigate between commands"
      styles={comandBarStyles}
    />
  );
}
