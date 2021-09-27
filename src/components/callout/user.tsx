import React from 'react'
import { Callout, 
    Link, 
    Text, 
    mergeStyleSets, 
    FontWeights, 
    CommandBarButton, 
    Stack, 
    IStackStyles, 
    Persona, 
    PersonaSize, 
    IPersonaSharedProps ,
} from '@fluentui/react';
import { useKeycloak } from '@react-keycloak/web';
import { useTranslation } from 'react-i18next';

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

    const examplePersona: IPersonaSharedProps = {
        secondaryText: 'gabi.santacruzpacheco@gmail.com',
        tertiaryText: 'editor',
      };

    // STYLES
    const styles = mergeStyleSets({
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
                    className={styles.callout}
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
                    <Persona size={PersonaSize.size48} text="Gabriela Rodriguez" {...examplePersona}/>
                    <Link href="/profile" className={styles.link}>
                        My profile
                    </Link>
                </Callout>
            )}
        </React.Fragment>
    )
}
