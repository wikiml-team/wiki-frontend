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
    const { t } = useTranslation("filemenu", { keyPrefix: 'new' });
    
    const [currentMethodology, setcurrentMethodology] = useState({id: "", name: ""})
    const [projectHideDialog, { toggle: toggleProjectHideDialog }] = useBoolean(true);

    const mapMethodologiesToCards = (data: any) => {

        const handleOnClick = (id : string, name : string) => {
            setcurrentMethodology({id: id, name: name})
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
            <Title>{t("header")}</Title>
            <Subtitle>{t("text")}</Subtitle>

            <Stack horizontal {...stackProps}>
                {methodologiesCards}
            </Stack>

            <NewProjectDialog 
                hideDialog={projectHideDialog}
                toggleHideDialog={toggleProjectHideDialog}
                methodology={currentMethodology}
                />
        </React.Fragment>
    )
}





