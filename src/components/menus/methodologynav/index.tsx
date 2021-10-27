import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import {
    INavStyles, 
    Nav, 
    useTheme, 
    FontSizes, 
    IIconProps,
    ActionButton,
    IButtonStyles,
    mergeStyleSets,
    INavLink
} from '@fluentui/react';
import { GetItems } from './items';
import Scrollbars from 'react-custom-scrollbars';

export default function MethodologyMenu() {

    // LOGIC
    const { t } = useTranslation('basics');

    const history = useHistory()
    
    const [selectedKey, setSelectedKey] = useState("")
    
    useEffect(() => {
        const path = history.location.pathname.split('/')
        const key = path[path.length - 1] === ""? "project_index" : `${path[path.length - 1]}` 
        setSelectedKey(key)
    }, [history])
    
    const handleNavOnClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
        if (ev) ev.preventDefault()
        
        if (item) {
            setSelectedKey(item.key || "project_index")
            history.push(item.url)
        }
    }
    
    const handleOnReturn = () => {
        history.push("/")
    }
    
    // STYLES
    const { palette } = useTheme();

    const classes = mergeStyleSets({
        footer: {
            "a": {
                paddingLeft: 36!,
            }
        },
    });
    
    // Action Button Return
    const buttonStyles: IButtonStyles = {
        root: {
            marginTop: 20,
            marginBottom: 20,
            width: '100%'
        },
        textContainer: {
            width: '100%',
            textAlign: 'left'
        }
    }
    
    const iconProps : Partial<IIconProps> = {
        iconName: 'NavigateBack',
        styles: {
            root: {
                paddingLeft: 7,
                marginRight: 10,
                fontSize: FontSizes.mediumPlus,
            }
        }
    }

    // Main navigation
    const navStyles: Partial<INavStyles> = {
        root: {
            height: "inherit",
            boxSizing: 'border-box',
            border: "none",
            overflowY: 'auto',
            color: palette.white!,
        },
        link: {
            paddingLeft: 10,
            fontSize: FontSizes.medium,
            // color: palette.white!,

            // '.ms-Nav-compositeLink:hover &': {
            //     backgroundColor: palette.themePrimary,
            //     color: palette.white
            // },

            // '.is-selected &': {
            //     backgroundColor: palette.themeDarkAlt
            // }

        },
        linkText: {
            // color: palette.white!
            paddingLeft: 30
        },
        groupContent: {
            marginBottom: 2
        },
        chevronIcon: {
            marginLeft: 8
        },
        chevronButton: {
            width: 30,
            // marginLeft: 10

        }
    };

    // NAVs
    const nav = GetItems()

    return (
        <React.Fragment>
            {/* close */}
            <ActionButton 
                iconProps={iconProps} 
                styles={buttonStyles}
                onClick={handleOnReturn}
            >
                {t("return")}
            </ActionButton>

            {/* Project */}
            <Scrollbars autoHide autoHeight autoHeightMin={100} autoHeightMax="calc(100vh - 75px)" >
            <Nav 
                selectedKey={selectedKey}
                ariaLabel="Methodology menu" 
                styles={navStyles} 
                groups={nav} 
                onLinkClick={handleNavOnClick}
                />
            </Scrollbars>

        </React.Fragment>
    )
}
