import React from 'react'
import { useTranslation } from "react-i18next";

import { IButtonStyles, 
        IconButton, 
        IStackProps, 
        Overlay, 
        PrimaryButton, 
        Stack, 
        useTheme,
        IButtonProps,
        TooltipHost,
        mergeStyleSets,
        Icon} from "@fluentui/react";

import MethodologyCard from "components/cards/methodologycard";
import ExecuteQuery from 'apollo/executequery';
import { GET_METHODOLOGIES } from "apollo/methodologies";
import { Centered, CenteredText } from 'components/styled/centered';
import { Subtitle, Title } from 'components/styled/text';

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
                contentToDisplay={<DisplayContentOverCard/>}/>
        </Stack.Item>
        )
    )
}

function DisplayContentOverCard(props : {add? : boolean}) {
    
    const { t } = useTranslation("permitions");
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
                    {
                        props.add? (
                            <PrimaryButton 
                                text={t("create")} 
                                onClick={()=> {}}/>
                        ) : (<>
                            <PrimaryButton
                                text={t("read")}
                                onClick={()=> {}} 
                                styles={buttonStyles}
                                />
                            <PrimaryButton 
                                text={t("edit")} 
                                onClick={()=> {}}/>
                            </>)
                    }
                </Stack>
            </Centered>
        </Overlay>
    )
}

