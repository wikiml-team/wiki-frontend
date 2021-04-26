import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  IColorCellProps,
  ISeparatorProps,
  ITextFieldStyles,
  Label,
  Persona,
  PersonaInitialsColor,
  PersonaSize,
  Separator,
  Stack,
  Text,
  TextField,
  useTheme,
} from "@fluentui/react";

import { setTheme } from "themes/themeslice";
import ThemePicker from "components/pickers/themepicker";

const colorCells: IColorCellProps[] = [
  { id: "1", label: "word", color: "#2b579a" },
  { id: "2", label: "excel", color: "#217346" },
  { id: "3", label: "powerpoint", color: "#a92b1a" },
  { id: "4", label: "teams", color: "#6264a7" },
];

export default function SettingsPanel() {
  // STYLES
  const palette = useTheme().palette;

  // TextField Styles
  const nameTextFieldStyles: Partial<ITextFieldStyles> = {
    fieldGroup: {
      borderColor: palette.neutralTertiary,
      ":hover": {
        borderColor: palette.neutralSecondary,
      },
      "::after": {
        borderColor: palette.neutralPrimaryAlt,
      },
    },
  };

  // Horizontal Separators
  const separatorProps: Partial<ISeparatorProps> = {
    alignContent: "end",
    styles: {
      root: {
        "::before": {
          background: palette.neutralTertiaryAlt,
          height: 0.4,
        },
      },
    },
  };

  // LOGIC
  const { t } = useTranslation(["sidepanel", "lenguages"]);
  const dispatch = useDispatch();

  return (
    <Stack tokens={{ childrenGap: 15 }}>
      <Separator {...separatorProps}>
        <Text variant="mediumPlus">
          <b>User</b>
        </Text>
      </Separator>
      {/* NAME */}
      <Stack.Item>
        <TextField
          label={t("name")}
          defaultValue="Gabriela Rodríguez"
          styles={nameTextFieldStyles}
        ></TextField>
      </Stack.Item>
      {/* NICKNAME */}
      <Stack.Item>
        <TextField
          label={t("nick")}
          defaultValue="Gabi"
          styles={nameTextFieldStyles}
        ></TextField>
      </Stack.Item>
      {/* COIN */}
      <Stack.Item>
        <Label>{t("coin")}</Label>
        <Persona
          text="Gabriela Rodríguez"
          size={PersonaSize.size40}
          initialsColor={PersonaInitialsColor.cyan}
        />
      </Stack.Item>
      <br />
      <Separator {...separatorProps}>
        <Text variant="mediumPlus">
          <b>{t("theme")}</b>
        </Text>
      </Separator>
      {/* <Stack.Item>
        <Toggle
          label="Select a theme"
          defaultChecked
          onText="Dark"
          offText="Light"
          onChange={handleChangeTheme}
        />
      </Stack.Item> */}
      <Stack.Item>
        <Label>{t("colortheme")}</Label>
        <Stack horizontal tokens={{ childrenGap: 5 }}>
          <ThemePicker
            colorCells={colorCells}
            size="30px"
            handler={(key) => dispatch(setTheme(key))}
          />
        </Stack>
      </Stack.Item>
    </Stack>
  );
}
