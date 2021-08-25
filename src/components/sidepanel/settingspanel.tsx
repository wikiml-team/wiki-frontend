import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  ISeparatorProps,
  IStackProps,
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

import { setTheme } from "store/slices/themeslice";
import ThemePicker from "components/pickers/themepicker";
import { colorCells } from "themes/office";

export default function SettingsPanel() {
  // STYLES
  const { palette } = useTheme();

  // Stack Props
  const stackProps: IStackProps = {
    tokens: {
      childrenGap: 15
    },
    styles: {
      root: {
        marginTop: 40
      }
    }
  }

  // TextField Styles
  const nameTextFieldStyles: Partial<ITextFieldStyles> = {
    fieldGroup: {
      borderColor: palette.neutralTertiary,
      ":hover": {
        borderColor: palette.neutralSecondary,
      },
    },
  };

  // Horizontal Separators
  const separatorProps: ISeparatorProps = {
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
  const { t } = useTranslation(["sidepanel"]);
  const dispatch = useDispatch();

  return (
    <Stack {...stackProps}>
      <Separator {...separatorProps}>
        <Text variant="mediumPlus">
          <b>{t("user")}</b>
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
        <Label>{t("color-theme")}</Label>
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
