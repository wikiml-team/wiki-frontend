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
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

// const links = ["home", "new", "open"]
// const footer_links = ["info", "export", "print", "share", "about"]

export default function FileMenu() {

    // LOGIC
    const { t } = useTranslation('navbar');
    const { palette } = useTheme();

    const history = useHistory()

    const [selectedKey, setSelectedKey] = useState("key1")

    const handleNavClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
        if (ev) ev.preventDefault()

        if (item) {
            setSelectedKey(item.key || "key1")
            history.push(item.url)
            window.localStorage.setItem('selectedKey', item.key || "key1")
        }
    }

    useEffect(() => {
        const storedSelectedOption = window.localStorage.getItem('selectedKey') || 'key1'
        setSelectedKey(storedSelectedOption)
      }, [])
    
    // STYLES
    const classes = mergeStyleSets({
        footer: {
            "a": {
            paddingLeft: 30!,
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
                    name: t('home'),
                    url: '/',
                    key: 'key1',
                    // iconProps: iconProps,
                    icon: 'Home',
                },
                {
                    name: t('new'),
                    url: '/new',
                    key: 'key2',
                    icon: 'Page',
                },
                {
                    name: t('open'),
                    url: '/open',
                    key: 'key3',
                    icon: 'OpenFolderHorizontal',
                }
            ],
        },
    ];

    // VAR
    const nav_methodologies: INavLinkGroup[] = [
        {
            links: [
                {
                    name: t('methodologies'),
                    url: '/methodologies',
                    key: 'key4',
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
                    name: t('info'),
                    url: '/1/info',
                    key: 'key5',
                },
                {
                    name: t('export'),
                    url: '/1/export',
                    key: 'key6',
                },
                {
                    name: t('print'),
                    url: '/1/print',
                    key: 'key7',
                },
                {
                    name: t('share'),
                    url: '/1/share',
                    key: 'key8',
                },
                {
                    name: t('about'),
                    url: '/1/about',
                    key: 'key9',
                },        
            ],
        }
    ]

    return (
        <div>
            {/* close */}
            <ActionButton 
                iconProps={iconProps} 
                styles={buttonStyles}
                href="/workplace">
                {t("return")}
            </ActionButton>

            {/* links */}
            <Nav 
                selectedKey={selectedKey}
                ariaLabel="File menu" 
                styles={navStyles} 
                groups={nav} 
                onLinkClick={handleNavClick}/>

            {/* Separator */}
            <Separator styles={separatorStyles}/>

            {/* My Methodologies */}
            <Nav 
                selectedKey={selectedKey}
                ariaLabel="File menu" 
                styles={navStyles} 
                groups={nav_methodologies} 
                onLinkClick={handleNavClick}/>

            {/* Separator */}
            <Separator styles={separatorStyles}/>

            {/* footer */}
            <Nav 
                selectedKey={selectedKey}
                ariaLabel="File menu" 
                styles={navStyles} 
                groups={footer_nav} 
                className={classes.footer}
                onLinkClick={handleNavClick}/>
        </div>
    )
}
