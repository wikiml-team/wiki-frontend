import React from 'react'
import { useTranslation } from "react-i18next";

import { Stack, Text } from "@fluentui/react";

import MethodologyCard from "components/cards/methodologycard";
import ExecuteQuery from 'apollo/executequery';
import { GET_METHODOLOGIES } from "apollo/methodologies";


export default function MethodologiesPage() {
    const { t } = useTranslation(["navbar", "homepages-subtitles"]);
    
    const methodologiesCards = ExecuteQuery({query: GET_METHODOLOGIES, applyToData: mapMethodologiesToCards})

    return <React.Fragment>
        <Text variant='xLarge' block>{t("methodologies")}</Text> <br/>
        {/* <Text variant='mediumPlus'>{t("homepages-subtitles:methodologies-description")}</Text> */}
        <Stack horizontal>
            {methodologiesCards}
        </Stack>
    </React.Fragment>
}

const mapMethodologiesToCards = (data: any) => {

    return data.methodologies.map(({ id , name } : any) =>  (
        <Stack.Item key={id}>
          <MethodologyCard name={name} href={`/methodologies/${id}`} />
        </Stack.Item>
        )
    )
}