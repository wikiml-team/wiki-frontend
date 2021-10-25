import React, { FunctionComponent, useCallback } from 'react'
import { useTranslation } from 'react-i18next';

import { DefaultButton,
        Dialog,
        DialogFooter,
        DialogType,
        Panel,
        PrimaryButton } from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks';

type SintaxHelpPanelProps = {
    isOpen: boolean,
    onDismiss: () => void
    header: string,
    onRenderFooterContent? : any,
}

const SintaxHelpPanel: FunctionComponent<SintaxHelpPanelProps> = (props) => {
    
    // LOGIC
    const { isOpen, onDismiss, header, onRenderFooterContent } = props;

    const { t } = useTranslation("basics");
    
    const [isDialogVisible, { setTrue: showDialog, setFalse: hideDialog }] = useBoolean(false);

    const onHideDialog = useCallback(
        ev => {
          ev.preventDefault();
          hideDialog();
        },
        [hideDialog],
    );
    
    const onHideDialogAndPanel = useCallback(() => {
        onDismiss();
        hideDialog();
    }, [onDismiss, hideDialog]);

    // STYLEs
    const dialogContentProps = {
        type: DialogType.normal,
        title: t("save-before-closing"),
    };
    
    const dialogModalProps = {
        isBlocking: true,
        styles: { main: { maxWidth: 450 } },
    };
      
    return (
        <React.Fragment>
            <Panel
                isOpen={isOpen}
                isLightDismiss={true}
                // onLightDismissClick={showDialog}
                onDismiss={onDismiss}
                headerText={header}
                closeButtonAriaLabel="Close"
                onRenderFooterContent={onRenderFooterContent}
                isHiddenOnDismiss={true}
                >
                {props.children}
            </Panel>

            <Dialog
                hidden={!isDialogVisible}
                onDismiss={onHideDialog}
                dialogContentProps={dialogContentProps}
                modalProps={dialogModalProps}
            >
                <DialogFooter>
                    <PrimaryButton onClick={onHideDialogAndPanel} text={t("yes")} />
                    <DefaultButton onClick={onHideDialog} text={t("no")} />
                </DialogFooter>
            </Dialog>
        </React.Fragment>
    )
}

export default SintaxHelpPanel

