import React from 'react'
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { GET_METHODOLOGIES } from "apollo/methodologies";

import { ProgressIndicator, Stack, Text } from "@fluentui/react";

import MethodologyCard from "components/cards/methodologycard";


export default function MethodologiesPage() {
    const { t } = useTranslation(["navbar", "homepages-subtitles"]);

    return <React.Fragment>
        <Text variant='xLarge' block>{t("methodologies")}</Text> <br/>
        <Text variant='mediumPlus'>{t("homepages-subtitles:methodologies-description")}</Text>
        <Stack horizontal>
            <MapMethodologiesToCards />
        </Stack>
    </React.Fragment>
}

export const MapMethodologiesToCards = () => {

    const {loading, error, data} = useQuery(GET_METHODOLOGIES);
    const { t } = useTranslation("loading")

    if (loading) {
        return <ProgressIndicator
                label={t("loading-title")} 
                description={t("loading-description")} />
    }
    
    if (error) return <p>Error :(</p>;

    return data.methodologies.map(({ id , name } : any) =>  (
        <Stack.Item key={id} >
          <MethodologyCard name={name} />
        </Stack.Item>
        )
    )
}