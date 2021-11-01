import React from 'react'
import { useTranslation } from 'react-i18next';

import { DetailsList,
         Stack,
         Text,
         IColumn, 
         TooltipHost,
         IconButton,
         SelectionMode, 
         IStackStyles,
         DetailsListLayoutMode,
         useTheme,
         IDetailsListProps,
         IDetailsRowStyles,
         DetailsRow,
         Icon} from '@fluentui/react';

import { Subtitle, Title } from 'components/styled/text';


interface IProject {
    key: string;
    name: string;
    methodology: string;
    owner: string;
    permition: Permition;
    dateModified: string;
}

type Permition = "owner" | "edit" | "read"

const permitions = {
    "owner": "StarburstSolid",
    "edit" : "EditSolid12",
    "read" : "ReadingModeSolid"
}

const recent_projects : IProject[] = [
    {
        key: "key1",
        name: "Reforestacion",
        methodology: "canadian",
        owner: "Alfonso Quesada",
        permition: "owner",
        dateModified: new Date().toLocaleDateString(),
    },
    {
        key: "key2",
        name: "Agua y Saneamiento",
        methodology: "canadian",
        owner: "Loreta Gonda",
        permition: "edit",
        dateModified: new Date().toLocaleDateString(),
    },
    {
        key: "key3",
        name: "Educacion para todos",
        methodology: "german",
        owner: "Paolo Ponce",
        permition: "read",
        dateModified: new Date().toLocaleDateString(),
    }
]

const own_project : IProject[] = [
    {
        key: "key4",
        name: "Reforestacion",
        methodology: "canadian",
        owner: "Alfonso Quesada",
        permition: "owner",
        dateModified: new Date().toLocaleDateString(),
    },
    {
        key: "key5",
        name: "Siembra Organica",
        methodology: "german",
        owner: "Alfonso Quesada",
        permition: "owner",
        dateModified: new Date().toLocaleDateString(),
    },
    {
        key: "key6",
        name: "Green town",
        methodology: "canadian",
        owner: "Alfonso Quesada",
        permition: "owner",
        dateModified: new Date().toLocaleDateString(),
    }
]


// Open: own projects, recent projects, new shared project (have been invited)
export default function OpenPage() {

    // LOGIC
    const { t } = useTranslation("filemenu", { keyPrefix: "open"})
    const t_basics = useTranslation("basics").t
    const t_settings = useTranslation("settings").t

    const { palette } = useTheme()

    const columns: IColumn[] = [
        {
            key: 'column1',
            name: 'icon',
            fieldName: 'icon',
            minWidth: 10,
            maxWidth: 35,
            data: 'string',
            onRender: (item: IProject) => iconRender(item)
        },
        {
            key: 'column2',
            name: 'description',
            fieldName: 'description',
            minWidth: 300,
            data: 'string',
            onRender: (item: IProject) => descriptionRender(item),
        },
        {
            key: 'column3',
            name: 'date',
            fieldName: 'date',
            minWidth: 200,
            data: 'string',
            onRender: (item: IProject) => dateRender(item),
        },
    ]

    // STYLES
    const stackStyles : IStackStyles = {
        root: {
            marginBottom: 25
        }
    }

    const iconRender = (project: IProject) => {
        return (    
            <TooltipHost content={t_settings(`permitions.${project.permition}`)}>
                <IconButton iconProps={{ iconName: permitions[project.permition]}}  />
            </TooltipHost>
        )
    }
    
    const descriptionRender = (project: IProject) => {
        return (
            <React.Fragment>
                <Text variant="medium">{project.name} -</Text>
                <Text variant="small"> {t_basics(`methodologies.${project.methodology}`)}</Text>

                <Text variant="smallPlus" block>{project.owner}</Text>
            </React.Fragment>
        )
    }

    const dateRender = (project: IProject) => {
        return (
            `${t("date")} ${project.dateModified}`
        )
    }

    const onRenderRow: IDetailsListProps['onRenderRow'] = props => {
        const customStyles: Partial<IDetailsRowStyles> = {
            root: {
                backgroundColor: palette.neutralLight
            }
        }
    
        if (props) {
          return <DetailsRow {...props} styles={customStyles} />;
        }
        return null;
    };

    return (
        <React.Fragment>
            <Title>{t("header")}</Title>

            <Stack styles={stackStyles}>
                <Subtitle>{t("recent")}</Subtitle> <br/>

                <DetailsList
                    items={recent_projects}
                    columns={columns}
                    selectionMode={SelectionMode.none}
                    isHeaderVisible={false}
                    onRenderRow={onRenderRow}
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    />
            </Stack>

            <Stack styles={stackStyles}>
                <Subtitle>{t("manage")}</Subtitle> <br/>

                <DetailsList
                    items={own_project}
                    columns={columns}
                    selectionMode={SelectionMode.none}
                    isHeaderVisible={false}
                    onRenderRow={onRenderRow}
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    />
            </Stack>

            <Stack styles={stackStyles}>
                <Subtitle>{t("shared")} {" "}
                    <TooltipHost content={t("shared-info")}>
                        <Icon iconName="Info" aria-label="info" />
                    </TooltipHost>
                </Subtitle>

                <DetailsList
                    items={recent_projects.slice(1)}
                    columns={columns}
                    selectionMode={SelectionMode.none}
                    isHeaderVisible={false}
                    onRenderRow={onRenderRow}
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    />
            </Stack>

            <Stack styles={stackStyles}>
                <Subtitle>{t("all")}</Subtitle> <br/>

                <DetailsList
                    items={own_project.concat(recent_projects)}
                    columns={columns}
                    selectionMode={SelectionMode.none}
                    isHeaderVisible={false}
                    onRenderRow={onRenderRow}
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    />
            </Stack>
        </React.Fragment>)
}
