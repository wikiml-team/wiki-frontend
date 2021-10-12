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
    const { t } = useTranslation();
    const tpath = "navbar:methodologies"
    
    const methodologiesCards = ExecuteQuery({query: GET_METHODOLOGIES, applyToData: mapMethodologiesToCards})

    // STYLES
    const { palette } = useTheme();

    const classes = mergeStyleSets({
        iconContainer: {
            position: "relative",
            height: 152,
            width: 60,
        }
    })

    const stackProps : IStackProps = {
        tokens: {childrenGap: 10},
        styles: {
            root: {
                marginTop: 20
            }
        }
    }

    const iconButtonProps : IButtonProps = {
        iconProps: {
            iconName: 'add'
        },
        styles: {
            root: {
                padding: 20,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: palette.themeDark,
                borderRadius: "30%",
            },
            rootHovered: {
                backgroundColor: palette.themeDarker,
            },
            rootPressed: {
                backgroundColor: palette.themePrimary,
            },
            icon: {
                fontSize: 20,
                color: palette.neutralLight,
            },
            iconHovered: {
                color: palette.neutralLighter
            }
        }
    }

    const tooltipStyles  = {
        root: {
            padding: 15
        }
    }

    return <React.Fragment>
        <Title>{t(`${tpath}:title`)}</Title>

        <Subtitle>
            {t(`${tpath}:description`)}{' '}
            <TooltipHost content={t(`${tpath}:permitions-note`)}>
                <Icon iconName="Info" aria-label="info" />
            </TooltipHost>
        </Subtitle>

        <Stack horizontal {...stackProps}>
            {/* To add a methodology */}
            <Stack.Item>
                <CenteredText className={classes.iconContainer}>
                    <TooltipHost content={t("permitions:create")} styles={tooltipStyles}>
                        <IconButton {...iconButtonProps} />
                    </TooltipHost>
                </CenteredText>
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

function DisplayContentOverCard() {
    
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
                    <PrimaryButton
                        text={t("read")}
                        onClick={()=> {}} 
                        styles={buttonStyles}
                    />
                    <PrimaryButton 
                        text={t("edit")} 
                        onClick={()=> {}} 
                    />
                </Stack>
            </Centered>
        </Overlay>
    )
}

