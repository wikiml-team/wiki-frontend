import { ChoiceGroup, ContextualMenu,
   DefaultButton,
   Dialog,
   DialogFooter,
   DialogType,
   IChoiceGroupOption,
  //  IChoiceGroupStyles,
   IDialogContentProps,
   PrimaryButton } from '@fluentui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';



type CustomDialogProps = {
    title: string,
    text?: string,
    hideDialog: boolean,
    toggleHideDialog: () => void,
    acceptOnClick: (option: string) => void,
    primaryButtonText?: string,
    options?: IChoiceGroupOption[],
    optionsTitle? : string
}

export default function CustomDialog(props : CustomDialogProps) {

    // LOGIC
    const {title, text, hideDialog, toggleHideDialog, acceptOnClick, primaryButtonText, options, optionsTitle} = props;
    const [optionSelected, setOptionSelected] = useState('A')

    const { t } = useTranslation("dialog");
    
    // STYLES
    // Modal
    const dialogContentProps : IDialogContentProps = {
        type: DialogType.normal,
        title: title,
        closeButtonAriaLabel: 'Close',
        subText: text,
      };

    const modalProps = {
          isBlocking: false,
          dragOptions: {
            moveMenuItemText: 'Move',
            closeMenuItemText: 'Close',
            menu: ContextualMenu,
            keepInBounds: true,
          },
        }

    // Options
    // const optionStyles : IChoiceGroupStyles = {
    //   root: {

    //   }
    // }

    const onChange = (ev?: React.FormEvent<HTMLInputElement | HTMLElement>, option?: IChoiceGroupOption): void => {
      setOptionSelected(option!.key);
    };

    return <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
        
    >
      {options && 
        <ChoiceGroup
        label={optionsTitle?? t("default-options-title")}
        options={options}
        onChange={onChange}
        // styles={}
        required
      />}
    <DialogFooter>
      <PrimaryButton onClick={() => acceptOnClick(optionSelected)} text={primaryButtonText?? t("default-accept") } />
      <DefaultButton onClick={toggleHideDialog} text="Cancel" />
    </DialogFooter>
  </Dialog>
}
