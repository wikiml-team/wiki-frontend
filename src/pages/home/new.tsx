import React from 'react'
import { useQuery } from '@apollo/client';

import { GET_METHODOLOGIES } from 'apollo/methodologies';
import { ProgressIndicator, Stack, Text } from '@fluentui/react';
import MethodologyPage from 'components/cards/methodologycard';
import { useTranslation } from 'react-i18next';

export default function NewPage() {
        
    const { t } = useTranslation("navbar");

    return <React.Fragment>
        <Text variant='xLarge'>{t("new")}</Text>
        <Stack horizontal>
            <NewProjects />
        </Stack>
    </React.Fragment>
}

const NewProjects = () => {

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
          <MethodologyPage name={name} />
        </Stack.Item>
        )
    )
}
