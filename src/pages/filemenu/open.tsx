import React from "react";
import { useTranslation } from "react-i18next";

import { useQuery } from "@apollo/client";
import { GetProjects, GetProjects_projects } from "types";
import { GET_PROJECTS } from "apollo/projects";
import QueryStateIndicator from "apollo/indicator";

import {
  DetailsList,
  Stack,
  Text,
  IColumn,
  TooltipHost,
  IconButton,
  SelectionMode,
  DetailsListLayoutMode,
  useTheme,
  IDetailsListProps,
  IDetailsRowStyles,
  DetailsRow,
  Icon,
  ITextStyles,
} from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";

import { Subtitle, Title } from "components/styled/text";

interface IProject {
  key: string;
  name: string;
  methodology: string;
  owner: string;
  dateModified: string;
  isFavorite?: boolean;
}

// Open: recent projects, new shared project, all
export default function OpenPage() {
  // LOGIC
  const { t } = useTranslation("filemenu", { keyPrefix: "open" });
  const t_basics = useTranslation("basics").t;
  const { palette } = useTheme();

  // DATA
  const { data, loading, error } = useQuery<GetProjects>(GET_PROJECTS);

  if (!data || loading || error)
    return <QueryStateIndicator data={data} loading={loading} error={error} />;

  // All projects
  const projects: IProject[] =
    data?.projects.map((project) => MapToProjectRow(project)) ||
    ([] as IProject[]);

  // Filter Recent projects
  const recentProjects: IProject[] = projects
    .filter((p) => {
      const pdate = new Date(p.dateModified);
      const now = new Date();
      // @ts-ignore
      const diffDays = Math.ceil(Math.abs(pdate - now) / (1000 * 60 * 60 * 24));
      return diffDays < 20;
    })
    // @ts-ignore
    .sort((p1, p2) => p1.dateModified - p2.dateModified)
    .slice(0, 3);

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "icon",
      fieldName: "icon",
      minWidth: 10,
      maxWidth: 35,
      data: "string",
      onRender: (item: IProject) => IconRender(item),
    },
    {
      key: "column2",
      name: "description",
      fieldName: "description",
      minWidth: 300,
      data: "string",
      onRender: (item: IProject) => DescriptionRender(item),
    },
    {
      key: "column3",
      name: "date",
      fieldName: "date",
      minWidth: 200,
      data: "string",
      onRender: (item: IProject) => DateRender(item),
    },
  ];

  // STYLES
  const IconRender = (project: IProject) => {
    // default value project.isFavorite
    const [isFavorite, { toggle: toggleIsFavorite }] = useBoolean(false);

    const handleOnClick = () => {
      toggleIsFavorite();
      // update in database
    };

    const starIconProps = {
      iconName: "FavoriteStarFill",
      styles: {
        root: {
          color: isFavorite ? palette.yellowDark : palette.accent,
        },
      },
    };

    return (
      <TooltipHost content={isFavorite ? t("isfavorite") : t("notfavorite")}>
        <IconButton iconProps={starIconProps} onClick={handleOnClick} />
      </TooltipHost>
    );
  };

  const DescriptionRender = (project: IProject) => {
    const name = `${project.name} - `;
    const methodology = t_basics([
      `methodologies.${project.methodology}`,
      project.methodology,
    ]);

    return (
      <React.Fragment>
        <Text variant="medium">{name}</Text>
        <Text variant="small">{methodology}</Text>

        <Text variant="smallPlus" block>
          {project.owner}
        </Text>
      </React.Fragment>
    );
  };

  const DateRender = (project: IProject) => {
    const date = new Date(project.dateModified).toLocaleDateString();
    const text = `${t("date")} ${date}`;

    const spanStyles: ITextStyles = {
      root: {
        display: "inline-block",
        verticalAlign: "middle",
        lineHeight: "normal",
      },
    };

    return (
      <div
        style={{
          height: "100%",
          lineHeight: "inherit",
        }}
      >
        <Text variant="small" styles={spanStyles}>
          {text}
        </Text>
      </div>
    );
  };

  const onRenderRow: IDetailsListProps["onRenderRow"] = (props) => {
    const customStyles: Partial<IDetailsRowStyles> = {
      root: {
        backgroundColor: palette.neutralLight,
      },
    };

    if (props) {
      return <DetailsRow {...props} styles={customStyles} />;
    }
    return null;
  };

  return (
    <React.Fragment>
      <Title>{t("header")}</Title>

      <Stack tokens={{ childrenGap: 20 }}>
        <Stack.Item>
          <Subtitle>{t("recent")}</Subtitle>
          {recentProjects.length > 0 ? (
            <DetailsList
              items={recentProjects}
              columns={columns}
              selectionMode={SelectionMode.none}
              isHeaderVisible={false}
              onRenderRow={onRenderRow}
              layoutMode={DetailsListLayoutMode.fixedColumns}
            />
          ) : (
            t("shared-null")
          )}
        </Stack.Item>

        <Stack.Item>
          <Subtitle>
            {t("shared")}{" "}
            <TooltipHost content={t("shared-info")}>
              <Icon iconName="Info" aria-label="info" />
            </TooltipHost>
          </Subtitle>

          {t_basics("unsupported")}

          {/* <DetailsList
          items={projects.slice(1)}
          columns={columns}
          selectionMode={SelectionMode.none}
          isHeaderVisible={false}
          onRenderRow={onRenderRow}
          layoutMode={DetailsListLayoutMode.fixedColumns}
        /> */}
        </Stack.Item>

        <Stack.Item>
          <Subtitle>{t("all")}</Subtitle> <br />
          <DetailsList
            items={projects}
            columns={columns}
            selectionMode={SelectionMode.none}
            isHeaderVisible={false}
            onRenderRow={onRenderRow}
            layoutMode={DetailsListLayoutMode.fixedColumns}
          />
        </Stack.Item>
      </Stack>
    </React.Fragment>
  );
}

const MapToProjectRow = (project: GetProjects_projects) => {
  const { t } = useTranslation("basics", { keyPrefix: "methodologies" });

  const methodology = project.methodology.name || '';
  
  return {
    key: project.id,
    name: project.shortName,
    methodology: t(methodology, methodology),
    dateModified: project.createdAt,
    owner: "Owner",
    // isFavorite: project.isFavorite
  } as IProject;
};
