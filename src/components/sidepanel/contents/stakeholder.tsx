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
import { CREATE_STAKEHOLDER, GET_PROYECT_STAKEHOLDERS, GET_STAKEHOLDERS, GET_STAKEHOLDERS_CATEGORIES, UPDATE_PROJECT_STAKEHOLDER } from 'apollo/stakeholders/projectstakeholder';
import { IStakholderInfo } from 'models/canadian/stakeholders';
import { useParams } from "react-router-dom";

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
    dismissPanel: () => void,
    projectStakeholder?: IStakholderInfo
 }


export function AddStakehoderPanelContent( props: IProps ) {
    const { t } = useTranslation("forms", { keyPrefix: "stakeholders.panel"});
    const { projectId } = useParams<any>();

    //Loaded state--------------------------------------------------------------------
    let [stakeholderName, setStakeholderName] = useState<string>()
    let [stakeholderCountry, setStakeholderCountry] = useState<string>()
    let [stakeholderErrorMessage, setstakeholderErrorMessage] = useState<string>()

    //Mutations-----------------------------------------------------------------------
    const [createStakeholder, mutationCreateStakeholder] = useMutation(CREATE_STAKEHOLDER)
    const [updateProjectSH, mutationUpdateProjectSH] = useMutation(UPDATE_PROJECT_STAKEHOLDER)

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
            }).then((result) => {
                let updateProjectStakeholder = {
                    id: props.projectStakeholder?.idProjectStakeHolder,
                    main: props.projectStakeholder?.main,
                    stakeholderCategoryId: props.projectStakeholder?.category.id,
                    projectId: Number(projectId),
                    stakeholderId: Number(result.data.createStakeholder.stakeholder.id)
                }

                updateProjectSH({
                    variables: { updateProjectStakeholder: updateProjectStakeholder },
                    refetchQueries: [{ query: GET_STAKEHOLDERS_CATEGORIES }, { query: GET_PROYECT_STAKEHOLDERS }, { query: GET_STAKEHOLDERS }]
                })
            })

            setStakeholderName('')
            setStakeholderCountry('')

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