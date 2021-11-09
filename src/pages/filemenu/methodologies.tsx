import React from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { toNumber } from "lodash";

import {
  IButtonStyles,
  IStackProps,
  Overlay,
  PrimaryButton,
  Stack,
  useTheme,
  TooltipHost,
  Icon,
} from "@fluentui/react";

import { useQuery } from "@apollo/client";
import { GetMethodologies, GetMethodologies_methodologies } from "types";
import { GET_METHODOLOGIES } from "apollo/methodologies";
import QueryStateIndicator from "apollo/indicator";

import MethodologyCard from "components/cards/methodologycard";
import { Centered } from "components/styled/centered";
import { Subtitle, Title } from "components/styled/text";

export default function MethodologiesPage() {
  // STYLES
  const stackProps: IStackProps = {
    tokens: { childrenGap: 10 },
    styles: {
      root: {
        marginTop: 20,
      },
    },
  };

  // LOGIC
  const { t } = useTranslation("filemenu", { keyPrefix: "methodologies" });

  // DATA
  const { data, loading, error } = useQuery<GetMethodologies>(GET_METHODOLOGIES);

  <QueryStateIndicator data={data} loading={loading} error={error} />

  return (
    <React.Fragment>
      <Title>{t("header")}</Title>

      <Subtitle>
        {t("text")}{" "}
        <TooltipHost content={t("permitions-info")}>
          <Icon iconName="Info" aria-label="info" />
        </TooltipHost>
      </Subtitle>

      <Stack horizontal {...stackProps}>
        {/* To add a methodology */}
        <Stack.Item>
          <MethodologyCard
            name={"Personalize methodology"}
            href={""}
            contentToDisplay={<DisplayContentOverCard add />}
            addCard
          />
        </Stack.Item>

        {/* To read or edit a methodology */}
       {data && data.methodologies.map(m => mapToCard(m))}
      </Stack>
    </React.Fragment>
  );
}

const mapToCard = (data: GetMethodologies_methodologies) => {
  return (
    <Stack.Item key={data.id}>
      <MethodologyCard
        name={data.name || ''}
        href={`/methodologies/${data.id}`}
        contentToDisplay={<DisplayContentOverCard methodology_id={toNumber(data.id)} />}
      />
    </Stack.Item>
  )
};

function DisplayContentOverCard(props: {
  add?: boolean;
  methodology_id?: number;
}) {
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
    <Overlay>
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
                  history.push(
                    `/methodology/${methodology_id}/features/index`
                  )
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
    </Overlay>
  );
}
