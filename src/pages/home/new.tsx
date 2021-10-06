import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

import { Stack, Text } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';

import MethodologyCard from 'components/cards/methodologycard';
import NewProjectDialog from 'components/dialog/newproject';
import ExecuteQuery from 'apollo/executequery';
import { GET_METHODOLOGIES } from 'apollo/methodologies';

export default function NewPage() {
    
    // LOGIC
    const { t } = useTranslation("navbar");
    
    const [methodologyId, setMethodologyId] = useState("1")
    const [projectHideDialog, { toggle: toggleProjectHideDialog }] = useBoolean(true);

    const mapMethodologiesToCards = (data: any) => {

        const handleOnClick = (id : string, name : string) => {
            // alert(id)
            setMethodologyId(id)
            toggleProjectHideDialog()
        }
    
        return data.methodologies.map(({ id , name } : any) =>  (
            <Stack.Item key={id}>
              <MethodologyCard name={name} onClick={() => handleOnClick(id, name)}/>
            </Stack.Item>
            )
        )
    }

    const methodologies = ExecuteQuery({query: GET_METHODOLOGIES, applyToData: mapMethodologiesToCards})

    return <React.Fragment>
        <Text variant='xLarge'>{t("new")}</Text>
        <Stack horizontal>
            {methodologies}
        </Stack>
        <NewProjectDialog 
            hideDialog={projectHideDialog}
            toggleHideDialog={toggleProjectHideDialog}
            methodologyId={methodologyId}/>
    </React.Fragment>
}





