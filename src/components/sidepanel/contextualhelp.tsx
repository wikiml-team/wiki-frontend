import React, { FunctionComponent } from 'react'
import { Panel } from '@fluentui/react'

type ContextualHelpPanelProps = {
    isOpen: boolean,
    onDismiss: () => void
    header: string
}

const ContextualHelpPanel: FunctionComponent<ContextualHelpPanelProps> = (props) => {
    
    const { isOpen, onDismiss, header } = props;
    
    return <Panel
      isOpen={isOpen}
      closeButtonAriaLabel="Close"
      isHiddenOnDismiss={true}
      headerText={header}
      onDismiss={onDismiss}
      isLightDismiss={true}
      isBlocking={false}
      isFooterAtBottom={true}
    >
        {props.children}
    </Panel>
}

export default ContextualHelpPanel