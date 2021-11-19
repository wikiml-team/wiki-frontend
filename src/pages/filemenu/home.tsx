import React from "react";
import { useTranslation } from "react-i18next";

import { ISeparatorStyles, Separator, Stack, useTheme } from "@fluentui/react";

import { useQuery } from "@apollo/client";
import { GetProjects, GetProjects_projects } from "types";
import { GET_PROJECTS } from "apollo/projects";
import QueryStateIndicator from "apollo/indicator";

import StaredProjects from "components/cards/staredprojects";
import { Subtitle, Title } from "components/styled/text";

export interface IFeaturedProject {
  name: string;
  methodology: string;
  owner: string;
  createdAt: string;
}

export default function HomePage() {
  // LOGIC
  const { t } = useTranslation("filemenu", { keyPrefix: "home" });
  const { palette } = useTheme();

  // DATA
  const { data, loading, error } = useQuery<GetProjects>(GET_PROJECTS);

  if (!data || loading || error)
    return <QueryStateIndicator data={data} loading={loading} error={error} />;

  // All projects
  const projects: IFeaturedProject[] =
    data?.projects.map((project) => MapProjectToCard(project)) ||
    ([] as IFeaturedProject[]); //add .filter(project => project.isFavorite)

  // STYLES
  const separatorStyles: Partial<ISeparatorStyles> = {
    root: {
      "::before": {
        height: 0.4,
        background: palette.neutralTertiaryAlt,
      },
    },
  };

  return (
    <React.Fragment>
      <Title>{t("header")}</Title>

      <Stack tokens={{ childrenGap: 20 }}>
        {/* Star Projects */}
        <Stack.Item>
          <Subtitle>{t("starprojects")}</Subtitle>
          <Stack horizontal>
            {projects.map((project: IFeaturedProject, key: number) => (
              <StaredProjects key={key} project={project} />
            ))}
          </Stack>
          <Separator styles={separatorStyles} />
        </Stack.Item>

        {/* Visualize Teams */}
        <Stack.Item>
          <Subtitle>{t("teams")}</Subtitle>
          <Separator styles={separatorStyles} />
        </Stack.Item>

        {/* Notifications */}
        <Stack.Item>
          <Subtitle>{t("notifications")}</Subtitle>
          <Separator styles={separatorStyles} />
        </Stack.Item>
      </Stack>
    </React.Fragment>
  );
}

const MapProjectToCard = (project: GetProjects_projects) => {
  const { t } = useTranslation("basics", { keyPrefix: "methodologies" });

  const methodology = project.methodology.name || ''

  return {
    name: project.shortName,
    methodology: t(methodology, methodology),
    owner: "owner",
    createdAt: project.createdAt,
  } as IFeaturedProject;
};
