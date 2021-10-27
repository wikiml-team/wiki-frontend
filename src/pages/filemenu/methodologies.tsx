import React from 'react'
import { useTranslation } from "react-i18next";

import { IButtonStyles, 
        IStackProps, 
        Overlay, 
        PrimaryButton, 
        Stack, 
        useTheme,
        TooltipHost,
        Icon} from "@fluentui/react";

import MethodologyCard from "components/cards/methodologycard";
import ExecuteQuery from 'apollo/executequery';
import { GET_METHODOLOGIES } from "apollo/methodologies";
import { Centered, CenteredText } from 'components/styled/centered';
import { Subtitle, Title } from 'components/styled/text';
import { useHistory } from 'react-router';

export default function MethodologiesPage() {

    // LOGIC
    const { t } = useTranslation("filemenu", { keyPrefix : "methodologies"});
    
    const methodologiesCards = ExecuteQuery({query: GET_METHODOLOGIES, applyToData: mapMethodologiesToCards})

    const stackProps : IStackProps = {
        tokens: {childrenGap: 10},
        styles: {
            root: {
                marginTop: 20
            }
        }
    }

    return <React.Fragment>
        <Title>{t("header")}</Title>

        <Subtitle>
            {t("text")}{' '}
            <TooltipHost content={t("permitions-info")}>
                <Icon iconName="Info" aria-label="info" />
            </TooltipHost>
        </Subtitle>

        <Stack horizontal {...stackProps}>
            {/* To add a methodology */}
            <Stack.Item>
                <MethodologyCard 
                    name={"Personalize methodology"} 
                    href={""} 
                    contentToDisplay={<DisplayContentOverCard add/>}
                    addCard
                    />
            </Stack.Item>

            {/* To read or edit a methodology */}
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
                contentToDisplay={<DisplayContentOverCard methodology_id={id}/>}/>
        </Stack.Item>
        )
    )
}

function DisplayContentOverCard(props : {add? : boolean, methodology_id?: number}) {
    
    const {add, methodology_id } = props

    const { t } = useTranslation("permitions");
    const { palette } = useTheme()
    const history = useHistory()
    
    const buttonStyles : IButtonStyles = {
        root: {
            backgroundColor: palette.themeDarker
        }
    }

    return (
        <Overlay>
            <Centered>
                <Stack horizontal tokens={{childrenGap: 10}}>
                    {
                        add? (
                            <PrimaryButton 
                                text={t("create")} 
                                onClick={()=> history.push('/methodology/create')}/>
                        ) : (<>
                            <PrimaryButton
                                text={t("read")}
                                onClick={()=> history.push(`methodology/${methodology_id}/read`)} 
                                styles={buttonStyles}
                                />
                            <PrimaryButton 
                                text={t("edit")} 
                                onClick={()=> history.push(`methodology/${methodology_id}/edit`)}/>
                            </>)
                    }
                </Stack>
            </Centered>
        </Overlay>
    )
}

