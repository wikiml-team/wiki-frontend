import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

import { IStackProps, Stack } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';

import MethodologyCard from 'components/cards/methodologycard';
import NewProjectDialog from 'components/dialog/newproject';
import ExecuteQuery from 'apollo/executequery';
import { GET_METHODOLOGIES } from 'apollo/methodologies';
import { Subtitle, Title } from 'components/styled/text';

export default function NewPage() {
    
    // LOGIC
    const { t } = useTranslation();
    const tpath = "navbar:new"
    
    const [methodologyId, setMethodologyId] = useState("1")
    const [projectHideDialog, { toggle: toggleProjectHideDialog }] = useBoolean(true);

    const mapMethodologiesToCards = (data: any) => {

        const handleOnClick = (id : string, name : string) => {
            setMethodologyId(id)
            toggleProjectHideDialog()
        }
    
        return data.methodologies.map(({ id , name } : any) =>  (
            <Stack.Item key={id}>
              <MethodologyCard name={name} onClick={() => handleOnClick(id, name)}/>
            </Stack.Item>
        ))
    }

    const methodologiesCards = ExecuteQuery({query: GET_METHODOLOGIES, applyToData: mapMethodologiesToCards})

    // STYLES
    const stackProps : IStackProps = {
        tokens: {childrenGap: 10},
        styles: {
            root: {
                marginTop: 20
            }
        }
    }

    return (
        <React.Fragment>
            <Title>{t(`${tpath}:title`)}</Title>
            <Subtitle>{t(t(`${tpath}:select-create-project`))}</Subtitle>

            <Stack horizontal {...stackProps}>
                {methodologiesCards}
            </Stack>

            <NewProjectDialog 
                hideDialog={projectHideDialog}
                toggleHideDialog={toggleProjectHideDialog}
                methodologyId={methodologyId}/>
        </React.Fragment>)
}





