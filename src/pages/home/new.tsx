import React from 'react'
import { useTranslation } from 'react-i18next';

import { Stack, Text } from '@fluentui/react';

import ExecuteQuery from 'apollo/executequery';
import { GET_METHODOLOGIES } from 'apollo/methodologies';
import MethodologyCard from 'components/cards/methodologycard';

export default function NewPage() {
        
    const { t } = useTranslation("navbar");

    return <React.Fragment>
        <Text variant='xLarge'>{t("new")}</Text>
        <Stack horizontal>
            <ExecuteQuery 
                query={GET_METHODOLOGIES} 
                applyToData={mapMethodologiesToCards}/>
        </Stack>
    </React.Fragment>
}


const mapMethodologiesToCards = (data: any) => {

    const handleOnClick = (id : string) => {
        alert(id)
    }

    return data.methodologies.map(({ id , name } : any) =>  (
        <Stack.Item key={id}>
          <MethodologyCard name={name} onClick={() => handleOnClick(id)} />
        </Stack.Item>
        )
    )
}


