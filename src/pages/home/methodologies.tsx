import React from 'react'
import { useTranslation } from "react-i18next";

import { IButtonStyles, IconButton, IStackProps, Overlay, PrimaryButton, Stack, Text, useTheme } from "@fluentui/react";

import MethodologyCard from "components/cards/methodologycard";
import ExecuteQuery from 'apollo/executequery';
import { GET_METHODOLOGIES } from "apollo/methodologies";
import { Centered } from 'components/styled/centered';
import { Title } from 'components/styled/titletext';


export default function MethodologiesPage() {

    // LOGIC
    const { t } = useTranslation(["navbar", "homepages-subtitles"]);
    
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

    return <React.Fragment>
        <Title>{t("methodologies")}</Title>
        <Stack horizontal {...stackProps}>
            {/* <Stack.Item>
                <IconButton
                    iconProps={{iconName: 'emoji'}}
                    styles={{root: {fontSize: 200}}}
                    />
            </Stack.Item> */}
            {methodologiesCards}
        </Stack>
    </React.Fragment>
}

const mapMethodologiesToCards = (data: any) => {

    return data.methodologies.map(({ id , name } : any) =>  (
        <Stack.Item key={id}>
            <MethodologyCard 
                name={name} 
                href={`/methodologies/${id}`} 
                contentToDisplay={<DisplayContentOverCard/>}/>
        </Stack.Item>
        )
    )
}

function DisplayContentOverCard() {
    
    const { palette } = useTheme()
    
    const buttonStyles : IButtonStyles = {
        root: {
        backgroundColor: palette.themeDarker
        }
    }

    return (
        <Overlay>
            <Centered>
                <Stack horizontal tokens={{childrenGap: 10}}>
                    <PrimaryButton
                        text="Read"
                        onClick={()=> {}} 
                        styles={buttonStyles}
                    />
                    <PrimaryButton 
                        text="Edit" 
                        onClick={()=> {}} 
                    />
                </Stack>
            </Centered>
        </Overlay>
    )
}