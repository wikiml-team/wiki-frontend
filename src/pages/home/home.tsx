import React from 'react'
import { useTranslation } from 'react-i18next';
import { ISeparatorStyles, Separator, Stack, Text, useTheme } from '@fluentui/react'

// import { useQuery } from '@apollo/client';
// import { GET_USER_PROJECTS } from 'apollo/methodologies';
import StaredProjects from 'components/cards/staredprojects';

// Home: star projects, visualizes teams, maybe notifications

type Example = {
    project: string,
    meth: string
}

export default function HomePage() {

    const { t } = useTranslation(["navbar", "homepage"]);
    const { palette } = useTheme();

    const exampledata : Example[] = [
        {project: "Agua y Sanamiento", meth: "Canadian Methodology"},
        {project: "Reforestacion", meth: "German Methodology"}
    ] 

    const separatorStyles: Partial<ISeparatorStyles> = {
        root: {
            "::before": {
                height: 0.4,
                background: palette.neutralTertiaryAlt,
            },
        },
    };
    return (
        <div>
            <Text variant='xLarge' styles={{root: {marginBottom: 20}}} block>{t("home")}</Text>

            {/* Star Projects */}

            <Stack>
                <Text variant='mediumPlus'>{t("homepages-subtitles:stared-projects")}</Text>
                <Stack horizontal>
                    {exampledata.map(({project, meth} : Example) => (
                        <StaredProjects projectName={project} methodology={meth}/>
                    ))}
                </Stack>
                <Separator styles={separatorStyles}/>

                {/* Visualize Teams */}
                <Text variant='mediumPlus'>{t("homepages-subtitles:teams")}</Text>
                <Separator styles={separatorStyles}/>

                {/* Notifications */}
                {/* Separator */}
                <Text variant='mediumPlus'>{t("homepages-subtitles:notifications")}</Text>
                <Separator styles={separatorStyles}/>
            </Stack>
        </div>
    )
}

// const UserProjects = () => {

//     const {loading, error, data} = useQuery(GET_USER_PROJECTS);
  
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error :(</p>;

//     return data.methodologies.map(({ id , name, methodology } : any) =>  (
//         <Stack.Item key={id} >
//           <StaredProjects projectName={name} methodology={methodology}/>
//         </Stack.Item>
//         )
//     )
// }
