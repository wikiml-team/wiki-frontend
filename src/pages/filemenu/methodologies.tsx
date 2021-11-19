import React from "react";
import { useTranslation } from "react-i18next";

import { toNumber } from "lodash";

import {
  Icon,
  IStackProps,
  Stack,
  TooltipHost,
} from "@fluentui/react";

import { useQuery } from "@apollo/client";
import { GetMethodologies, GetMethodologies_methodologies } from "types";
import { GET_METHODOLOGIES } from "apollo/methodologies";
import QueryStateIndicator from "apollo/indicator";

import MethodologyCard from "components/cards/methodologycard";
import { Subtitle, Title } from "components/styled/text";
import { DisplayContentOverCard } from "components/cards/actionsovercard";

export default function MethodologiesPage() {
  // LOGIC
  const { t } = useTranslation("filemenu", { keyPrefix: "methodologies" });
  
  // STYLES
  const stackProps: IStackProps = {
    tokens: { childrenGap: 10 },
    styles: {
      root: {
        marginTop: 20,
      },
    },
  };

  // DATA
  const { data, loading, error } =
    useQuery<GetMethodologies>(GET_METHODOLOGIES);

  if (!data || loading || error)
    return <QueryStateIndicator data={data} loading={loading} error={error} />;

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
        {data && data.methodologies.map((m) => mapToCard(m))}
      </Stack>
    </React.Fragment>
  );
}

const mapToCard = (data: GetMethodologies_methodologies) => {
  return (
    <Stack.Item key={data.id}>
      <MethodologyCard
        name={data.name || ""}
        href={`/methodologies/${data.id}`}
        contentToDisplay={
          <DisplayContentOverCard methodology_id={toNumber(data.id)} />
        }
      />
    </Stack.Item>
  );
};


