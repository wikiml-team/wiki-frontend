import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { useBoolean } from "@fluentui/react-hooks";

import {
  Dropdown,
  Icon,
  IDropdownOption,
  Label,
  Stack,
  Text,
  TextField,
  Toggle,
  TooltipHost,
} from "@fluentui/react";

import CustomDialog from "./custom";
import { GetLanguages_languages, GetProjects, GetProjects_projects, GetMethodologyByName_methodology } from "types";
import { MouseEventHandler, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_NEW_PROJECT } from "apollo/projects/mutations";
import { ProjectAddItem } from "models/project";

type NewProjectCalloutProps = {
  hideDialog: boolean;
  toggleHideDialog: () => void;
  methodology: { id: string; name: string };
  languages: GetLanguages_languages[];
};

export default function NewProjectDialog(props: NewProjectCalloutProps) {
  const { hideDialog, toggleHideDialog, methodology, languages } = props;

  // LOGIC
  const { t } = useTranslation("commands", { keyPrefix: "new" });
  const history = useHistory();

  //DATA------------------------------------------------------------------
  let [projectName, setProjectName] = useState('')
  let [projectLanguage, setProjectLanguage] = useState({key: 0, text: ''})
  const [projectPrivacy, { toggle: toggleProjectPrivacy }] = useBoolean(true);
  let [errorMessages, setErrorMessages] = useState({name: '', language: ''})

  //Mutations----------------------------------------------------------------
  const [addNewProject, mutationAddNewProject] = useMutation(ADD_NEW_PROJECT)


  //SUBMIT DATA HANDLER-----------------------------------------------------------
  const handleAccpetButtonOnClick = (option: string) => {
    //Validation
    let nameErrorMessage = ''
    let languageErrorMessage = ''
    let validated = true

    if (!projectName){
      nameErrorMessage = t("error-messages.name-error")
      validated = false
    }

    if (projectLanguage.key === 0){
      languageErrorMessage = t("error-messages.language-error")
      validated = false
    }

    if (!validated){
      setErrorMessages({name: nameErrorMessage, language: languageErrorMessage})
    }
    else{
      toggleHideDialog();
      //Saving new project
      let itemNew = {
        shortName: projectName,
        largeName: "largeName",
        description: "description",
        durationPlan: 1, 
        solicitedBudget: 1,
        public: projectPrivacy,
        wikimlCode: "wikimlCode",
        currencyCode: "ESP",
        methodologyId: Number(methodology.id),
        programId: 1,
        sectorId: 1,
        projectStatusId: 1,
        languageId: projectLanguage.key
      }

      addNewProject({
        variables: { input:  itemNew},
        //refetchQueries: [{ query: GET_BUDGET_TEMPLATE, variables: {"id": methodologyId}  }]
      })

      //alert(`${t("success-message")} \n ----------------- \n Metodology: ${methodology.id} \n Name: ${projectName} \n Language: ${projectLanguage.text} \n Privacy: ${projectPrivacy}`);
      // CREATE PROJECT
      //history.push(`/workplace/1`);
    }
  };

  return (
    <CustomDialog
      dialogContentProps={{ title: t("header") }}
      hidden={hideDialog}
      onDismiss={toggleHideDialog}
      primaryButtonText={t("accept-label")}
      acceptOnClick={handleAccpetButtonOnClick}
      optionalBody={<NewProjectDialogBody 
                            name={methodology.name} 
                            languages={languages} 
                            projectPrivacy = {projectPrivacy}
                            setProjectName= {setProjectName} 
                            setProjectLanguage= {setProjectLanguage} 
                            toggleProjectPrivacy= {toggleProjectPrivacy}  
                            errorMessages = {errorMessages}
                            />}
    />
  );
}

type NewProjectDialogBodyProps = {
  name: string;
  languages: GetLanguages_languages[];
  projectPrivacy: boolean
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  setProjectLanguage: React.Dispatch<React.SetStateAction<any>>
  toggleProjectPrivacy: MouseEventHandler<HTMLElement>;
  errorMessages: { name: string; language: string; };
};

function NewProjectDialogBody(props: NewProjectDialogBodyProps) {
  const { name, languages, projectPrivacy, setProjectName, setProjectLanguage, toggleProjectPrivacy, errorMessages } = props;

  //DATA HANDLER-----------------------------------------------------------
  const changeHandler_ProjectName = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
    newValue = event.currentTarget.value;
    setProjectName(newValue)
    return newValue
  }

  const changeHandler_ProjectLanguage = ((event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<any> | undefined, index?: number | undefined) => {
      setProjectLanguage(option)
  })

  // LOGIC-------------------------------------------------------------
  const { t } = useTranslation("commands", { keyPrefix: "new.body" });
  const { t: t_basics } = useTranslation("basics", {
    keyPrefix: "methodologies",
  });

  const methodology = t_basics(name, name);

  //DROPDOWN OPTIONS--------------------------------------------------
  //Languages options
  const languagesOptions = languages.map((key) => {
    return {
      key: key.id,
      text: '(' + key.code + ') - ' + key.name,
    };
  });

  return (
    <Stack tokens={{ childrenGap: 16 }}>
      <Label>{t("text")}</Label>
      <Text variant="medium" styles={{ root: { marginTop: "1px !important" } }}>
        {methodology}
      </Text>

      <TextField
        required
        errorMessage={errorMessages.name}
        label={t("name-label")}
        placeholder={t("name-placeholder")}
        onChange={changeHandler_ProjectName}
      />

      <Dropdown
        required
        errorMessage={errorMessages.language}
        label={t("language-label")}
        placeholder={t("language-placeholder")}
        options={languagesOptions}
        onChange={changeHandler_ProjectLanguage}
      />

      <Toggle
        label={
          <>
            {t("privacy-label")}{" "}
            <TooltipHost content={t("privacy-text")}>
              <Icon iconName="Info" aria-label="info" />
            </TooltipHost>
          </>
        }
        onText={t("privacy-on")}
        offText={t("privacy-off")}
        checked={projectPrivacy}
        onClick={toggleProjectPrivacy}
      />
    </Stack>
  );
}
