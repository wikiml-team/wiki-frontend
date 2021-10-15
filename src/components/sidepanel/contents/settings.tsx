import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  ISeparatorProps,
  IStackProps,
  Label,
  Link,
  Separator,
  Stack,
  Text,
  Toggle,
  useTheme,
} from "@fluentui/react";

import { setTheme } from "store/slices/themeslice";
import ThemePicker from "components/pickers/themepicker";
import { colorCells } from "themes/office";

export default function SettingsPanelContent() {

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
  const { t } = useTranslation("commands", { keyPrefix: "settings"});
  const t1 = useTranslation("basics").t
  
  const dispatch = useDispatch();

  const handleChangePrivacy = () => {

  }

  return (
    <Stack {...stackProps}>
      <Separator {...separatorProps}>
        <Text variant="mediumPlus">
          <b>{t("privacy-header")}</b>
        </Text>
      </Separator>
      {/* TOOGLE */}
      <Stack.Item>
        <Toggle
          label={t("privacy-label")}
          defaultChecked
          onText={t1("private")}
          offText={t1("public")}
          onChange={handleChangePrivacy}
        />
      </Stack.Item>
      {/* LINK */}
      <Stack.Item>
        {t("privacy-settings-text")} {' '}
        <Link href="/settings/privacy" underline>{t("privacy-settings-link")}</Link>.
      </Stack.Item>
      
      <br />

      <Separator {...separatorProps}>
        <Text variant="mediumPlus">
          <b>{t("theme-header")}</b>
        </Text>
      </Separator>
      <Stack.Item>
        <Label>{t("color-theme-title")}</Label>
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
