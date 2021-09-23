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
         IDetailsListStyles,
         DetailsListLayoutMode,
         useTheme,
         IDetailsListProps,
         IDetailsRowStyles,
         DetailsRow} from '@fluentui/react';


interface IProject {
    key: string;
    name: string;
    methodology: string;
    owner: string;
    permitions: Permitions;
    dateModified: string;
}

type Permitions = "owner" | "edit" | "read"

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
        permitions: "owner",
        dateModified: new Date().toLocaleDateString(),
    },
    {
        key: "key2",
        name: "Agua y Saneamiento",
        methodology: "canadian",
        owner: "Loreta Gonda",
        permitions: "edit",
        dateModified: new Date().toLocaleDateString(),
    },
    {
        key: "key3",
        name: "Educacion para todos",
        methodology: "german",
        owner: "Paolo Ponce",
        permitions: "read",
        dateModified: new Date().toLocaleDateString(),
    }
]

const own_project : IProject[] = [
    {
        key: "key1",
        name: "Reforestacion",
        methodology: "canadian",
        owner: "Alfonso Quesada",
        permitions: "owner",
        dateModified: new Date().toLocaleDateString(),
    },
    {
        key: "key2",
        name: "Siembra Organica",
        methodology: "german",
        owner: "Alfonso Quesada",
        permitions: "owner",
        dateModified: new Date().toLocaleDateString(),
    },
    {
        key: "key3",
        name: "Green town",
        methodology: "canadian",
        owner: "Alfonso Quesada",
        permitions: "owner",
        dateModified: new Date().toLocaleDateString(),
    }
]


// Open: own projects, recent projects, new shared project (have been invited)
export default function OpenPage() {

    // LOGIC
    const { t } = useTranslation(["navbar", "homepages-subtitles"]);
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
            onRender: (item: IProject) => item.dateModified,
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
            <TooltipHost content={t(project.permitions)}>
                <IconButton iconProps={{ iconName: permitions[project.permitions]}}  />
            </TooltipHost>
        )
    }
    
    const descriptionRender = (project: IProject) => {
        return (
            <React.Fragment>
                <Text variant="medium">{project.name}-</Text>
                <Text variant="small">{t(project.methodology)}</Text>

                <Text variant="smallPlus" block>{project.owner}</Text>
            </React.Fragment>
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

    return <React.Fragment>
        <Text variant='xLarge' styles={{root: {marginBottom: 20}}} block>{t("open")}</Text>

        <Stack styles={stackStyles}>
            <Text variant='mediumPlus'>{t("homepages-subtitles:recent")}</Text> <br/>

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
            <Text variant='mediumPlus'>{t("homepages-subtitles:owner")}</Text> <br/>

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
            <Text variant='mediumPlus'>{t("homepages-subtitles:shared")}</Text> <br/>

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
            <Text variant='mediumPlus'>{t("homepages-subtitles:all")}</Text> <br/>

            <DetailsList
                items={own_project.concat(recent_projects)}
                columns={columns}
                selectionMode={SelectionMode.none}
                isHeaderVisible={false}
                onRenderRow={onRenderRow}
                layoutMode={DetailsListLayoutMode.fixedColumns}
            />
        </Stack>
    </React.Fragment>
}

