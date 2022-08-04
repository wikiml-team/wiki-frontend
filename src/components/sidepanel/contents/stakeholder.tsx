import { useTranslation } from 'react-i18next';

import {
    Stack,
    TextField,
    Dropdown,
    IDropdownOption,
    PrimaryButton,
    DefaultButton,
    BaseButton,
    Button
} from "@fluentui/react";
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_STAKEHOLDER } from 'apollo/stakeholders/projectstakeholder';

const countriesData = require('models/countries.json');

let countries: IDropdownOption[] = []



function getCountries() {
    try{
        countries = []
        let item = {
            key: '',
            text: '----------',
            isSelected: true
        };
        countries.push(item)

        countriesData.map((currentCountry: any) => {
          let item = {
            key: currentCountry.code,
            text: currentCountry.name,
            isSelected: false
          };
          countries.push(item)
        });
        countries.sort((a,b) => (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0))

        
    }catch(error){
        console.log(error)
    } 
} 
getCountries()

interface IProps {
    dismissPanel: () => void;
 }


export function AddStakehoderPanelContent( props: IProps ) {
    const { t } = useTranslation("forms", { keyPrefix: "stakeholders.panel"});

    //Loaded state--------------------------------------------------------------------
    let [stakeholderName, setStakeholderName] = useState<string>()
    let [stakeholderCountry, setStakeholderCountry] = useState<string>()
    let [stakeholderErrorMessage, setstakeholderErrorMessage] = useState<string>()

    //Mutations-----------------------------------------------------------------------
    const [createStakeholder, mutationCreateStakeholder] = useMutation(CREATE_STAKEHOLDER)

    //Handle data-----------------------------------------------------------------------------------------------------------------------
    const changeNameHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
        newValue = event.currentTarget.value;
        setStakeholderName(newValue)
        return newValue
    }

    const changeCountryHandler = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
        if (option?.key){
            setStakeholderCountry(String(option?.key))
        }
        return option
    }

    const changeandler = (event: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | BaseButton | Button | HTMLSpanElement> | undefined) => {
        return true
    }

    function saveStakeholder() {
        try{
            let inputStakeholder = {
                name: stakeholderName,
                countryCode: stakeholderCountry
            }
            
            createStakeholder({
                variables: { inputCreateStakeholder: inputStakeholder },
            })
    
            props.dismissPanel()
        }catch(err){
            setstakeholderErrorMessage('Ha ocurrido un error registrando el SH')
        }
        
    }

    return (
        <Stack tokens={{ childrenGap: 16 }}>
            <Stack.Item>
                {t("explanation")}
                <br /><br />
            </Stack.Item>

            <Stack.Item>
                <TextField
                    label={t("name-label")}
                    value={stakeholderName}
                    errorMessage={stakeholderErrorMessage}
                    onChange={changeNameHandler}
                />
            </Stack.Item>

            <Stack.Item>
                <Dropdown
                    options={countries}
                    label={t("country-label")}
                    onChange={changeCountryHandler}
                />
            </Stack.Item>

            <Stack.Item>
                <PrimaryButton
                    styles={{ root: { marginRight: 8 } }}
                    onClick={saveStakeholder}
                    >
                    Save
                </PrimaryButton>

                <DefaultButton onClick={props.dismissPanel}>Cancel</DefaultButton>
            </Stack.Item>
            

                
        </Stack>
    )
}