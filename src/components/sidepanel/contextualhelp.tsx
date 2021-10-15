import { FunctionComponent } from 'react'

import { Panel } from '@fluentui/react'
import { useTranslation } from 'react-i18next';

type ContextualHelpPanelProps = {
    isOpen: boolean,
    onDismiss: () => void
}

const ContextualHelpPanel: FunctionComponent<ContextualHelpPanelProps> = (props) => {
    
    const { isOpen, onDismiss } = props;
    const { t } = useTranslation("forms", { keyPrefix: "contextual-help"})
    
    return (
        <Panel
            closeButtonAriaLabel="Close"
            headerText={t("help-panel-header")}
            isOpen={isOpen}
            isHiddenOnDismiss={true}
            isLightDismiss={true}
            isBlocking={false}
            isFooterAtBottom={true}
            onDismiss={onDismiss}
            >
            {props.children}
        </Panel>
    )
}

export default ContextualHelpPanel