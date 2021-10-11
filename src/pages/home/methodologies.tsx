import React from 'react'
import { useTranslation } from "react-i18next";

import { IButtonStyles, 
        IconButton, 
        IStackProps, 
        Overlay, 
        PrimaryButton, 
        Stack, 
        Text, 
        useTheme,
        IButtonProps,
        TooltipHost,
        mergeStyleSets} from "@fluentui/react";

import MethodologyCard from "components/cards/methodologycard";
import ExecuteQuery from 'apollo/executequery';
import { GET_METHODOLOGIES } from "apollo/methodologies";
import { Centered, CenteredText } from 'components/styled/centered';
import { Title } from 'components/styled/titletext';


export default function MethodologiesPage() {

    // LOGIC
    const { t } = useTranslation(["navbar", "homepages-subtitles"]);
    
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
            icon: {
                fontSize: 20,
                color: palette.neutralLight,
            },
            rootHovered: {
                backgroundColor: palette.themeDarker,
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
        <Title>{t("methodologies")}</Title>
        <Text variant='mediumPlus'>{t("homepages-subtitles:methodologies-description")}</Text>

        <Stack horizontal {...stackProps}>
            {/* To add a methodology */}
            <Stack.Item>
                <CenteredText className={classes.iconContainer}>
                    <TooltipHost content={t("homepages-subtitles:permition-create")} styles={tooltipStyles}>
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
    
    const { t } = useTranslation("homepages-subtitles");
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
                        text={t("permition-read")}
                        onClick={()=> {}} 
                        styles={buttonStyles}
                    />
                    <PrimaryButton 
                        text={t("permition-edit")} 
                        onClick={()=> {}} 
                    />
                </Stack>
            </Centered>
        </Overlay>
    )
}

