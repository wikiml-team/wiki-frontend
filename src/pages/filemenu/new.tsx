import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { IStackProps, Stack } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";

import MethodologyCard from "components/cards/methodologycard";
import NewProjectDialog from "components/dialog/newproject";
import { GET_METHODOLOGIES } from "apollo/methodologies";
import { Subtitle, Title } from "components/styled/text";
import { useQuery } from "@apollo/client";
import { GetMethodologies, GetMethodologies_methodologies } from "types";
import QueryStateIndicator from "apollo/indicator";

export default function NewPage() {
  // LOGIC
  const { t } = useTranslation("filemenu", { keyPrefix: "new" });

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

  const { data, loading, error } =
    useQuery<GetMethodologies>(GET_METHODOLOGIES);

  <QueryStateIndicator data={data} loading={loading} error={error} />;

  // STYLES
  const stackProps: IStackProps = {
    tokens: { childrenGap: 10 },
    styles: {
      root: {
        marginTop: 20,
      },
    },
  };

  return (
    <React.Fragment>
      <Title>{t("header")}</Title>
      <Subtitle>{t("text")}</Subtitle>

      <Stack horizontal {...stackProps}>
        {data && data.methodologies.map((m) => mapToCard(m, handleOnClick))}
      </Stack>

      <NewProjectDialog
        hideDialog={projectHideDialog}
        toggleHideDialog={toggleProjectHideDialog}
        methodology={currentMethodology}
      />
    </React.Fragment>
  );
}

const mapToCard = (
  methodology: GetMethodologies_methodologies,
  handler: (id: string, name: string) => void
) => {
  const { id, name } = methodology;

  return (
    <Stack.Item key={id}>
      <MethodologyCard name={name || ""} onClick={() => handler(id, name || "")} />
    </Stack.Item>
  );
};
