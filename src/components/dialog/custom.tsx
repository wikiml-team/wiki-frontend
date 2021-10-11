import { ChoiceGroup, ContextualMenu,
   DefaultButton,
   Dialog,
   DialogFooter,
   DialogType,
   IChoiceGroupOption,
   IDialogContentProps,
   IDialogProps,
   PrimaryButton } from '@fluentui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type OptionsProps = {
  options: IChoiceGroupOption[],
  optionsTitle? : string,
  optionsSelectedKey? : string
}

type CustomDialogProps = {
    acceptOnClick: (option: string) => void,
    primaryButtonText?: string,
    optionsProps?: OptionsProps,
    optionalBody?: any 
}

export default function CustomDialog(props : CustomDialogProps & IDialogProps) {

    // LOGIC
    const {acceptOnClick, 
          primaryButtonText,  
          optionsProps,
          dialogContentProps,
          optionalBody,
          ...allprops} = props;

    const { t } = useTranslation("dialog");

    const onChange = (ev?: React.FormEvent<HTMLInputElement | HTMLElement>, option?: IChoiceGroupOption): void => {
        setOptionSelected(option!.key);
    };
          
    let defaultKey = "";
    let choiceGroup = <></>

    if (optionsProps) {
      const {  options, optionsTitle, optionsSelectedKey } = optionsProps as OptionsProps;
      defaultKey = optionsSelectedKey?? (options && options[0]? options[0].key : "")

      choiceGroup = <ChoiceGroup
                            label={optionsTitle?? t("default-options-title")}
                            options={options}
                            onChange={onChange}
                            // defaultSelectedKey={defaultKey}
                            required
                          />
    }
    const [optionSelected, setOptionSelected] = useState(defaultKey || "")

    
    // STYLES
    const customDialogContentProps : IDialogContentProps = {
        type: DialogType.normal,
        closeButtonAriaLabel: 'Close',
        ...dialogContentProps
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


    return <Dialog
        dialogContentProps={customDialogContentProps}
        modalProps={modalProps}
        {...allprops}
    >
      {optionsProps && choiceGroup}
      {optionalBody}
    <DialogFooter>
      <PrimaryButton
        onClick={() => acceptOnClick(optionSelected)} 
        text={primaryButtonText?? t("default-accept") } />
      <DefaultButton 
        onClick={() => {if (allprops.onDismiss) allprops.onDismiss()}} 
        text="Cancel" />
    </DialogFooter>
  </Dialog>
}
