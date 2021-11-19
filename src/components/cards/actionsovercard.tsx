import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

import { IButtonStyles, PrimaryButton, Stack, useTheme } from "@fluentui/react";
import { Centered } from "components/styled/centered";

type DisplayContentOverCardProps = {
  add?: boolean;
  methodology_id?: number;
};

export function DisplayContentOverCard(props: DisplayContentOverCardProps) {
  const { add, methodology_id } = props;

  const { t } = useTranslation("permitions");
  const { palette } = useTheme();
  const history = useHistory();

  const buttonStyles: IButtonStyles = {
    root: {
      backgroundColor: palette.themeDarker,
    },
  };

  return (
    <Centered>
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        {add ? (
          <PrimaryButton
            text={t("create")}
            onClick={() => history.push("/methodology/new")}
          />
        ) : (
          <>
            <PrimaryButton
              text={t("read")}
              onClick={() =>
                history.push(`/methodology/${methodology_id}/features/index`)
              }
              styles={buttonStyles}
            />
            <PrimaryButton
              text={t("edit")}
              onClick={() =>
                history.push(
                  `/methodology/${methodology_id}/features/update/index`
                )
              }
            />
          </>
        )}
      </Stack>
    </Centered>
  );
}
