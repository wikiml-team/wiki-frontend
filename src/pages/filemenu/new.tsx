import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { IStackProps, Stack } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";

import { useQuery } from "@apollo/client";
import { GET_METHODOLOGIES } from "apollo/methodologies";
import { GetMethodologies, GetMethodologies_methodologies } from "types";
import QueryStateIndicator from "apollo/indicator";

import MethodologyCard from "components/cards/methodologycard";
import NewProjectDialog from "components/dialog/newproject";
import { Subtitle, Title } from "components/styled/text";

export default function NewPage() {
  // LOGIC
  const { t } = useTranslation("filemenu", { keyPrefix: "new" });
  const { t: t_basics } = useTranslation("basics", { keyPrefix: "methodologies" });

  const [currentMethodology, setcurrentMethodology] = useState({
    id: "",
    name: "",
  });

  const [projectHideDialog, { toggle: toggleProjectHideDialog }] =
    useBoolean(true);

  const handleOnClick = (id: string, name: string) => {
    setcurrentMethodology({ id: id, name: name });
    toggleProjectHideDialog();
  };

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
      <Subtitle>{t("text")}</Subtitle>

      <Stack horizontal {...stackProps}>
        {data && data.methodologies.map((m) => MapToCard(m, handleOnClick, t_basics))}
      </Stack>

      <NewProjectDialog
        hideDialog={projectHideDialog}
        toggleHideDialog={toggleProjectHideDialog}
        methodology={currentMethodology}
      />
    </React.Fragment>
  );
}

const MapToCard = (
  methodology: GetMethodologies_methodologies,
  handler: (id: string, name: string) => void,
  t: Function
) => {
  const { id, name } = methodology;
  const methodologyName = name || "";

  return (
    <Stack.Item key={id}>
      <MethodologyCard
        name={t(methodologyName, methodologyName)}
        onClick={() => handler(id, methodologyName)}
      />
    </Stack.Item>
  );
};
