import { useDispatch } from "react-redux";
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

import { themeActions } from "themes/themeSlice";
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
      selectors: {
        ":hover": {
          borderColor: palette.neutralSecondary,
        },
        "::after": {
          borderColor: palette.neutralPrimaryAlt,
        },
      },
    },
  };

  // Horizontal Separators
  const separatorProps: Partial<ISeparatorProps> = {
    alignContent: "end",
    styles: {
      root: {
        selectors: {
          "::before": {
            background: palette.neutralTertiaryAlt,
            height: 0.4,
          },
        },
      },
    },
  };

  // LOGIC
  const dispatch = useDispatch();

  const handleChangeTheme = (id: string) => {
    switch (id) {
      case "1":
        dispatch(themeActions.setWord());
        break;
      case "2":
        dispatch(themeActions.setExcel());
        break;
      case "3":
        dispatch(themeActions.setPowerPoint());
        break;
      case "4":
        dispatch(themeActions.setTeams());
        break;
      default:
        break;
    }
  };

  return (
    <Stack gap={15}>
      <Separator {...separatorProps}>
        <Text variant="mediumPlus">
          <b>User</b>
        </Text>
      </Separator>
      {/* NAME */}
      <Stack.Item>
        <TextField
          label="Change your name"
          defaultValue="Gabriela Rodríguez"
          styles={nameTextFieldStyles}
        ></TextField>
      </Stack.Item>
      {/* NICKNAME */}
      <Stack.Item>
        <TextField
          label="Change your nickname"
          defaultValue="Gabi"
          styles={nameTextFieldStyles}
        ></TextField>
      </Stack.Item>
      {/* COIN */}
      <Stack.Item>
        <Label>Change your picture</Label>
        <Persona
          text="Gabriela Rodríguez"
          size={PersonaSize.size40}
          initialsColor={PersonaInitialsColor.cyan}
        />
      </Stack.Item>
      <br />
      <Separator {...separatorProps}>
        <Text variant="mediumPlus">
          <b>Theme</b>
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
        <Label>Select a color</Label>
        <Stack horizontal gap={5}>
          <ThemePicker
            colorCells={colorCells}
            size="30px"
            handler={handleChangeTheme}
          />
        </Stack>
      </Stack.Item>
    </Stack>
  );
}
