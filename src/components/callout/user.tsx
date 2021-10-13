import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

import { useKeycloak } from '@react-keycloak/web';
import { KeycloakProfile } from 'keycloak-js';

import { Callout, 
    Link, 
    mergeStyleSets, 
    CommandBarButton, 
    Stack, 
    IStackStyles, 
    Persona, 
    PersonaSize, 
} from '@fluentui/react';

type UserCalloutProps = {
    isCalloutVisible : boolean,
    toggleIsCalloutVisible: () => void,
    calloutButtonId: string
}

export default function UserCallout(props : UserCalloutProps) {

    // LOGIC
    const { isCalloutVisible, toggleIsCalloutVisible, calloutButtonId } = props;
    
    const { t } = useTranslation("authentication")
    const { keycloak } = useKeycloak()

    const handleLogout = () => keycloak.logout();
    const handleLogin = () => keycloak.login();

    const [profile, setProfile] = useState<KeycloakProfile>({})
    
    useEffect(() => {
        keycloak.loadUserProfile().then((info : any) => {
            setProfile(info)
        }).catch(() => {
            console.warn('Failed to load user profile')
        })
    }, [keycloak])

    // STYLES
    const classes = mergeStyleSets({
        callout: {
            width: 320,
            padding: '20px 24px',
        },
        link: {
            display: 'block',
            marginLeft: 60,
            // marginTop: 20
        },
    });


    const stackStyles: Partial<IStackStyles> = { 
        root: { 
            height: 40 
        } 
    };

    return (
        <React.Fragment>
            {isCalloutVisible && (
                <Callout
                    className={classes.callout}
                    role="alertdialog"
                    gapSpace={0}
                    target={`#${calloutButtonId}`}
                    onDismiss={toggleIsCalloutVisible}
                    setInitialFocus
                >
                    <Stack horizontal horizontalAlign="end" styles={stackStyles}>
                        <CommandBarButton 
                            text={keycloak.authenticated? t("authentication:logout") : t("authentication:login")} 
                            onClick={keycloak.authenticated? handleLogout : handleLogin}>
                        </CommandBarButton>
                    </Stack>
                    {keycloak.authenticated && <>
                        <Persona 
                        size={PersonaSize.size48} 
                        text={profile.firstName} 
                        secondaryText={profile.email}
                        tertiaryText='editor'
                        />
                        <Link href="/settings/profile" className={classes.link}>
                            {t("profile-link")}
                        </Link></>
                    }
                </Callout>
            )}
        </React.Fragment>
    )
}
