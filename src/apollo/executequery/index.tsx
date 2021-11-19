import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { DocumentNode } from "graphql";
import { useQuery, QueryHookOptions } from "@apollo/client";

import { ProgressIndicator } from "@fluentui/react";

type ExecuteQueryProps = {
  query: DocumentNode;
  queryOptions?: QueryHookOptions;
  applyToData?: (data: any) => ReactElement;
};

export default function ExecuteQuery(props: ExecuteQueryProps) {
  const { query, applyToData, queryOptions } = props;

  const { loading, error, data } = useQuery(query, {
    pollInterval: 500,
    ...queryOptions,
  });
  const { t } = useTranslation("basics", { keyPrefix: "loading" });

  if (loading)
    return (
      <ProgressIndicator label={t("title")} description={t("description")} />
    );

  if (error) return <p>{`${t("error")}: ${error.name} \n ${error.message}`}</p>;

  return applyToData ? applyToData(data) : data;
}
