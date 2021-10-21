import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { INavLinkGroup, 
    INavStyles, 
    Nav, 
    useTheme, 
    FontSizes, 
    IIconProps,
    ActionButton,
    IButtonStyles,
    Separator,
    ISeparatorStyles,
    mergeStyleSets,
    INavLink
} from '@fluentui/react';

export default function FileMenu() {

    // LOGIC
    const { t } = useTranslation(['menuheaders', 'basics']);
    const translateNames = (nav : INavLinkGroup[]) : INavLinkGroup[] => {

        const { links } = nav[0]

        const translated = links.map((link, key) => {
            return {
                ...link,
                key: link.key,
                name: t(`filemenu.${link.name}`)
            }
        })

        return [{ links: translated}];
    }

    const history = useHistory()
    
    const [selectedKey, setSelectedKey] = useState("")
    
    useEffect(() => {
        const path = history.location.pathname.split('/')
        const key = path[path.length - 1] === ""? "key_home" : `key_${path[path.length - 1]}` 
        setSelectedKey(key)
    }, [history])
    
    const handleNavClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
        if (ev) ev.preventDefault()
        
        if (item) {
            setSelectedKey(item.key || "key_home")
            history.push(item.url)
        }
    }
    
    const handleOnReturn = () => {
        history.push("/workplace")
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
            paddingLeft: 10
        },
        groupContent: {
            marginBottom: 2
        }
    };

    // Separator
    const separatorStyles: Partial<ISeparatorStyles> = {
        root: {
        "::before": {
            margin: "0px 10px",
            height: 0.4,
            background: palette.neutralTertiaryAlt,
            },
        },
    };

    // NAVs
    const nav: INavLinkGroup[] = [
        {
            links: [
                {
                    name: 'home',
                    url: '/',
                    key: 'key_home',
                    icon: 'Home',
                },
                {
                    name: 'new',
                    url: '/new',
                    key: 'key_new',
                    icon: 'Page',
                },
                {
                    name: 'open',
                    url: '/open',
                    key: 'key_open',
                    icon: 'OpenFolderHorizontal',
                }
            ],
        },
    ];

    const nav_methodologies: INavLinkGroup[] = [
        {
            links: [
                {
                    name: 'methodologies',
                    url: '/methodologies',
                    key: 'key_methodologies',
                    // iconProps: iconProps,
                    icon: 'StackIndicator',
                }
            ],
        },
    ];
    
    const footer_nav: INavLinkGroup[] = [
        {
            links: [
                {
                    name: 'info',
                    url: '/1/info',
                    key: 'key_info',
                },
                {
                    name: 'export',
                    url: '/1/export',
                    key: 'key_export',
                },
                {
                    name: 'print',
                    url: '/1/print',
                    key: 'key_print',
                },
                {
                    name: 'share',
                    url: '/1/share',
                    key: 'key_share',
                },
                {
                    name: 'about',
                    url: '/1/about',
                    key: 'key_about',
                },        
            ],
        }
    ]


    return (
        <React.Fragment>
            {/* close */}
            <ActionButton 
                iconProps={iconProps} 
                styles={buttonStyles}
                onClick={handleOnReturn}
            >
                {t("basics:return")}
            </ActionButton>

            {/* links */}
            <Nav 
                selectedKey={selectedKey}
                ariaLabel="File menu" 
                styles={navStyles} 
                groups={translateNames(nav)} 
                onLinkClick={handleNavClick}/>

            {/* Separator */}
            <Separator styles={separatorStyles}/>

            {/* This only appears if the user has permission to modify at leat one methodology */}
            
            {/* My Methodologies */}
            <Nav 
                selectedKey={selectedKey}
                ariaLabel="File menu" 
                styles={navStyles} 
                groups={translateNames(nav_methodologies)} 
                onLinkClick={handleNavClick}/>

            {/* Separator */}
            <Separator styles={separatorStyles}/>

            {/* footer */}
            <Nav 
                selectedKey={selectedKey}
                ariaLabel="File menu" 
                styles={navStyles} 
                groups={translateNames(footer_nav)} 
                className={classes.footer}
                onLinkClick={handleNavClick}/>
        </React.Fragment>
    )
}
