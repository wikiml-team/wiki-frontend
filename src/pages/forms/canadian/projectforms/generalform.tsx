import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

import { string, object, number, setLocale } from "yup";
import { Field, FormikValues } from "formik";

import { useMutation, useQuery } from "@apollo/client";
import {
  GetPrograms,
  GetProjectById,
  GetProjectByIdVariables,
  GetProjects_projects,
  GetSectors,
} from "types";
import { GET_PROJECT_BY_ID, GET_APPROVED_PROJECTS, GET_RECIPIENT_COUNTRY, GET_CO_FUNDER } from "apollo/projects/project";
import QueryStateIndicator from "apollo/indicator";

import {
  Stack,
  ITextFieldProps,
  IDropdownOption,
  IStackProps,
  mergeStyleSets,
  Separator,
  PrimaryButton,
  ISeparatorProps,
  Label,
} from "@fluentui/react";
import { Grid, Col, Row } from "fluentui-react-grid";

import { selectProject } from "store/slices/projectslice";
import { ECanadianSector } from "models/sector";
import { IProjectInfo } from "models/project";
import DropdownFieldInput from "components/inputs/dropdown";
import TextFieldInput from "components/inputs/text";
import DateFieldInput from "components/inputs/datepicker";
import AutoSaveFormik from "components/form/autosaveform";
import { GET_SECTORS } from "apollo/sectors";
import { GET_PROGRAMS } from "apollo/programs";
import { CREATE_PROJECT_APPROVED, UPDATE_AID_RECIPIENT_COUNTRY, UPDATE_PROJECT, UPDATE_PROJECT_APPROVED } from "apollo/projects/mutations";
import { GET_PROYECT_STAKEHOLDERS } from "apollo/stakeholders.tsx/projectstakeholder";

type formValuesType = FormikValues | GetProjects_projects;

export default function GeneralForm() {
  // LOGIC
  const { t } = useTranslation("forms", { keyPrefix: "general" });
  const { projectId } = useParams<any>();

  const project = useSelector(selectProject);
  const generalInfo = project.info as IProjectInfo<ECanadianSector>;

  

  const handleSubmit = (values: formValuesType, { setSubmitting }: any) => {
    alert(values);
  };

  // STYLE
  const classes = mergeStyleSets({
    circle: {
      height: 40,
      width: 40,
      borderRadius: "50%",
      minWidth: 40,
      fontSize: 16,
    },
    select: {
      height: 35,
      backgroundColor: 'white',
      width: 150,
      minWidth: 40,
      fontSize: 14,
    },
  });

  const multilineTextFieldProps: ITextFieldProps = {
    required: true,
    multiline: true,
    autoAdjustHeight: true,
    styles: {
      root: {
        width: "100%",
        marginTop: 10,
      },
      field: {
        height: 100,
      },
    },
  };

  const headerStackProps: IStackProps = {
    tokens: { childrenGap: "m" },
    horizontal: true,
    horizontalAlign: "space-between",
    styles: {
      root: {
        paddingRight: 40,
      },
    },
  };

  const separatorProps: ISeparatorProps = {
    alignContent: "start",
  };

  //Loaded project state--------------------------------------------------------------------
  let [projectShortName, setprojectShortName] = useState<string | null>()
  let [projectLargeName, setprojectLargeName] = useState<string | null>()
  let [projectDescription, setprojectDescription] = useState<string | null>()
  let [projectDurationPlan, setprojectDurationPlan] = useState<number | null>()
  let [projectSolicitedBudget, setprojectSolicitedBudget] = useState<number | null>()
  let [projectPublic, setprojectPublic] = useState<boolean | null>()
  let [projectWikimlCode, setprojectWikimlCode] = useState<string | null>()
  let [projectCurrencyCode, setprojectCurrencyCode] = useState<string | null>()
  let [projectMethodologyId, setprojectMethodologyId] = useState<number | null>()
  let [projectProgramId, setprojectProgramId] = useState<number | null>()
  let [projectSectorId, setprojectSectorId] = useState<number | null>()
  let [projectStatusId, setProjectStatusId] = useState<number | null>()
  let [projectLanguageId, setLanguageId] = useState<number | null>()

  let [projectApprovedId, setApprovedId] = useState<number | null>()
  let [projectApprovedBudget, setApprovedBudget] = useState<number | null>()
  let [projectApprovedDate, setApprovedDate] = useState<Date | null>() 
  let [projectDonorAssignedCode, setDonorAssignedCode] = useState<string | null>()
  let [projectPlanFinalDate, setPlanFinalDate] = useState<Date | null>() 
  let [projectPlanInitialDate, setPlanInitialDate] = useState<Date | null>() 

  let [projectPrincipalRecipientCountry, setPrincipalRecipientCountry] = useState<string | null>()
  let [projectBudgetFinanced, setProjectBudgetFinanced] = useState<number | null>()
  let [projectBudgetFinancedMainDonor, setProjectBudgetFinancedMainDonor] = useState<number | null>()

  // DATA----------------------------------------------------------------------------------------------------------------------------
  const { data, loading, error } = useQuery(GET_PROJECT_BY_ID, {
    variables: { id: projectId },
  });
  
  const recipientCountryResponse = useQuery(GET_RECIPIENT_COUNTRY, {
    variables: { idProject: projectId },
  });

  const sectorsResponse = useQuery<GetSectors>(GET_SECTORS);
  const programsResponse = useQuery<GetPrograms>(GET_PROGRAMS);
  const stakeholdersResponse = useQuery(GET_PROYECT_STAKEHOLDERS);
  const approvedProjectsResponse = useQuery(GET_APPROVED_PROJECTS);
  const coFundersResponse = useQuery(GET_CO_FUNDER);
  
  let countries: IDropdownOption[] = []
  let currencies: IDropdownOption[] = []
  let mainImplementer : IDropdownOption[] = []
  let mainIntermediary : IDropdownOption[] = []
  let mainDonor : IDropdownOption[] = []

  const currencie = require('models/currency.json');
  const countriesData = require('models/countries.json');
  
  //Mutations------------------------------------------------------------------------------------------------------------------------
  const [updateProject, mutationUpdateProject] = useMutation(UPDATE_PROJECT)
  const [updateProjectApproved, mutationUpdateProjectApproved] = useMutation(UPDATE_PROJECT_APPROVED)
  const [createProjectApproved, mutationCreateProjectApproved] = useMutation(CREATE_PROJECT_APPROVED)
  const [updateAidRecipientCountry, mutationUpdateAidRecipientCountry] = useMutation(UPDATE_AID_RECIPIENT_COUNTRY)

  //Form validation------------------------------------------------------------------------------------------------------------------
  let [errorMessages, setErrorMessages] = useState({shortName: '', largeName: '', description: '', durationPlan: ''})

  //Handle data-----------------------------------------------------------------------------------------------------------------------
  const changeShortNameHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
    newValue = event.currentTarget.value;
    setprojectShortName(newValue)
    return newValue
  }

  const changeLargeNameHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
    newValue = event.currentTarget.value;
    setprojectLargeName(String(newValue))
    return newValue
  }

  const changeDescriptionHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
    newValue = event.currentTarget.value;
    setprojectDescription(newValue)
    return newValue
  }

  const changeProgramHandler = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
    if (option?.key){
      setprojectProgramId(Number(option?.key))
    }
    return option
  }

  const changeSectorHandler = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
    if (option?.key){
      setprojectSectorId(Number(option?.key))
    }
    return option
  }

  const changeDurationHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
    newValue = event.currentTarget.value;
    setprojectDurationPlan(Number(newValue))
    return newValue
  }

  const changeCurrencyHandler = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
    if (option?.key){
      setprojectCurrencyCode(String(option?.key))
    }
    return option
  }

  const changePrincipalRecipientCountryHandler = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
    if (option?.key){
      setPrincipalRecipientCountry(String(option?.key))
    }
    return option
  }

  const changeSolicitedBudgetHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
    newValue = event.currentTarget.value;
    setprojectSolicitedBudget(Number(newValue))
    return newValue
  }

  const changeApprovedDateHandler = (date: any) => {
    setApprovedDate(date as Date)
    return date
  };

  const changePlanFinalDateHandler = (date: any) => {
    setPlanFinalDate(date as Date)
    return date
  };

  const changePlanInitialDateHandler = (date: any) => {
    setPlanInitialDate(date as Date)
    return date
  };

  const changeDonorAssignedCodeHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
    newValue = event.currentTarget.value;
    setDonorAssignedCode(String(newValue))
    return newValue
  }

  //Initial load of the data
  useEffect(() => {
    setLocale({
      // use constant translation keys for messages without values
      mixed: {
        default: "field_invalid",
      },
      // use functions to generate an error object that includes the value from the schema
      // string: {
      //   default: "asi mismo",
      // },
      // number: {
      //   default: "asimismo",
      // },
    });

    if (data){
        setprojectShortName(data.project!.shortName)
        setprojectLargeName(data.project!.largeName)
        setprojectDescription(data.project!.description)
        setprojectDurationPlan(data.project!.durationPlan)
        setprojectSolicitedBudget(data.project!.solicitedBudget)
        setprojectPublic(data.project!.public)
        setprojectWikimlCode(data.project!.wikimlCode)
        setprojectCurrencyCode(data.project!.currencyCode)
        setprojectMethodologyId(Number(data.project!.methodology.id))
        setprojectProgramId(data.project!.programId)
        setprojectSectorId(data.project!.sectorId)
        setProjectStatusId(data.project!.projectStatusId)
        setLanguageId(data.project!.languageId)
    }  

    if (approvedProjectsResponse.data){
      approvedProjectsResponse.data.approvedProjects.map((current: any) => {
          if (Number(current.projectId) === Number(data.project!.id)){
            setApprovedId(Number(current.id))
            setApprovedBudget(Number(current.approvedBudget))
            setApprovedDate(new Date(current.approvedDate))
            setDonorAssignedCode(current.donorAssignedCode)
            setPlanFinalDate(new Date(current.planFinalDate))
            setPlanInitialDate(new Date(current.planInitialDate))
          }
        });
    }

    if (recipientCountryResponse.data){
      if (recipientCountryResponse.data.aidRecipientCountry.countryCode){
        setPrincipalRecipientCountry(String(recipientCountryResponse.data.aidRecipientCountry.countryCode))
      }
    }

    if (coFundersResponse.data){
      let contribution = 0
      let mainDonorContribution = 0

      coFundersResponse.data.coFunders.map((p: any) => {
        if (Number(p.projectStakeholder.projectId) === Number(data.project!.id)){
          contribution += p.contribution
          if (Number(p.projectStakeholder.stakeholderCategoryId) === 3 && p.projectStakeholder.main){
            mainDonorContribution += p.contribution
          }
        }
      });
      setProjectBudgetFinanced(contribution) 
      setProjectBudgetFinancedMainDonor(mainDonorContribution)
    }
    
  },[data]);

  //Updating values of project
  useEffect(() => {
    const timer = setTimeout(() => {
      //Validating data--------------------------------------------
      let formValidated = true
      let shortNameError = ''
      let shortLargeNameError = ''
      let DescriptionError = ''
      let DurationPlanError = ''

      //ShortName
      if (!projectShortName){  
        shortNameError = 'Este campo es obligatorio'
        formValidated = false
      }
      if (projectShortName && projectShortName?.length > 20 ){  
        shortNameError = 'Exceso de caracteres'
        formValidated = false
      }

      //LargeName
      if (!projectLargeName){  
        shortLargeNameError = 'Este campo es obligatorio'
        formValidated = false
      }

      //Description
      if (!projectDescription){  
        DescriptionError = 'Este campo es obligatorio'
        formValidated = false
      }

      //DurationPlan
      if (!projectDurationPlan){  
        DurationPlanError = 'Este campo es obligatorio'
        formValidated = false
      }

      if (projectDurationPlan && (projectDurationPlan > 999 || projectDurationPlan < 0)){
        DurationPlanError = 'Solo puede colocar valores entre 0 y 999'
        formValidated = false
      }

      setErrorMessages({
        shortName: shortNameError, 
        largeName: shortLargeNameError, 
        description: DescriptionError,
        durationPlan: DurationPlanError
      })
      //End validations----------------------------------------------

      if (data && approvedProjectsResponse.data && recipientCountryResponse.data && formValidated){
        let inputProjectUpdate = {
          id: Number(data.project!.id),
          shortName: projectShortName,
          largeName: projectLargeName,
          description: projectDescription,
          durationPlan: projectDurationPlan,
          solicitedBudget: projectSolicitedBudget,
          public: projectPublic,
          wikimlCode: projectWikimlCode,
          currencyCode: projectCurrencyCode,
          methodologyId: projectMethodologyId,
          programId: projectProgramId,
          sectorId: projectSectorId,
          projectStatusId: projectStatusId,
          languageId: projectLanguageId
        }

        updateProject({
          variables: { inputProjectUpdate: inputProjectUpdate },
        })
      

        let inputApprovedProjectUpdate = {
          id: projectApprovedId,
          donorAssignedCode: projectDonorAssignedCode,
          approvedBudget: projectApprovedBudget,
          approvedDate: projectApprovedDate as Date,
          planInitialDate: projectPlanInitialDate as Date,
          planFinalDate: projectPlanFinalDate as Date,
          projectId: Number(data.project!.id)
        }

        updateProjectApproved({
          variables: { inputUpdateApprovedProject: inputApprovedProjectUpdate },
        })

        let input = {
          id: Number(recipientCountryResponse.data.aidRecipientCountry.id),
          countryCode: projectPrincipalRecipientCountry,
          mainRecipientCountry: recipientCountryResponse.data.aidRecipientCountry.mainRecipientCountry,
          projectId: recipientCountryResponse.data.aidRecipientCountry.projectId
        }

        updateAidRecipientCountry({
          variables: { inputCreateAidRecipientCountry: input },
        })
      }

    }, 3000)
    return () => clearTimeout(timer)
  },[projectShortName, 
    projectLargeName, 
    projectDescription, 
    projectProgramId, 
    projectSectorId, 
    projectDurationPlan, 
    projectCurrencyCode, 
    projectSolicitedBudget,
    projectApprovedDate,
    projectPlanFinalDate,
    projectPlanInitialDate,
    projectPrincipalRecipientCountry,
    projectDonorAssignedCode
  ]);

  if (!sectorsResponse.data || sectorsResponse.loading) {
    return (
      <QueryStateIndicator
        data={sectorsResponse.data}
        loading={sectorsResponse.loading}
        error={sectorsResponse.error}
      />
    );
  }

  if (!programsResponse.data || programsResponse.loading) {
    return (
      <QueryStateIndicator
        data={programsResponse.data}
        loading={programsResponse.loading}
        error={programsResponse.error}
      />
    );
  }

  if (!stakeholdersResponse.data || stakeholdersResponse.loading) {
    return (
      <QueryStateIndicator
        data={stakeholdersResponse.data}
        loading={stakeholdersResponse.loading}
        error={stakeholdersResponse.error}
      />
    );
  }

  if (!approvedProjectsResponse.data || approvedProjectsResponse.loading) {
    return (
      <QueryStateIndicator
        data={approvedProjectsResponse.data}
        loading={approvedProjectsResponse.loading}
        error={approvedProjectsResponse.error}
      />
    );
  }

  if (!recipientCountryResponse.data || recipientCountryResponse.loading) {
    return (
      <QueryStateIndicator
        data={recipientCountryResponse.data}
        loading={recipientCountryResponse.loading}
        error={recipientCountryResponse.error}
      />
    );
  }

  if (!coFundersResponse.data || coFundersResponse.loading) {
    return (
      <QueryStateIndicator
        data={coFundersResponse.data}
        loading={coFundersResponse.loading}
        error={coFundersResponse.error}
      />
    );
  }

  if (!data || loading || error)
    return <QueryStateIndicator data={data} loading={loading} error={error} />;

  const initValues: formValuesType = {
    shortName: data.project!.shortName,
    largeName: data.project!.largeName,
    methodology: data.project!.methodology,
    description: data.project!.description,
    language: data.project!.languageId,
    program: data.project!.programId?.toString(),
    projectStatusId: data.project!.projectStatusId,
    public: data.project!.public,
    sector: data.project!.sectorId.toString(),
    currencyCode: data.project!.currencyCode,
    durationPlan: data.project!.durationPlan,
    intermediateOutcomes: data.project!.intermediateOutcomes,
    projectPermissions: data.project!.projectPermissions,
    solicitedBudget: data.project!.solicitedBudget,
    ultimateOutcome: data.project!.ultimateOutcome,
    wikimlCode: data.project!.wikimlCode,
    createdAt: data.project!.createdAt,
  };

  let sectors = sectorsResponse.data?.sectors.map((s) => {
    return {
      key: s.id,
      text: s.name,
      isSelected: (Number(s.id) === Number(data.project!.sectorId))
    };
  });

  let programs = programsResponse.data.programs.map((p) => {
    return {
      key: p.id,
      text: p.name,
      isSelected: (Number(p.id) === Number(data.project!.programId))
    };
  });

  function getMainImplementer() {
    try{
        mainImplementer = []
        stakeholdersResponse.data.projectStakeholders.map((p: any) => {
          if (Number(p.projectId) === Number(data.project!.id) && (Number(p.stakeholderCategoryId) === 1)){
            let input :IDropdownOption<any> =  {
              key: p.stakeholder.id,
              text: p.stakeholder.name,
              isSelected: p.main
            };
            mainImplementer.push(input)
          }
        });
    }catch(error){
        console.log(error)
    } 
  } 
  getMainImplementer()

  function getMainIntermediary() {
    try{
        mainIntermediary = []
        stakeholdersResponse.data.projectStakeholders.map((p: any) => {
          if (Number(p.projectId) === Number(data.project!.id) && (Number(p.stakeholderCategoryId) === 2)){
            let input :IDropdownOption<any> =  {
              key: p.stakeholder.id,
              text: p.stakeholder.name,
              isSelected: p.main
            };
            mainIntermediary.push(input)
          }
        });
    }catch(error){
        console.log(error)
    } 
  }
  getMainIntermediary()

  function getMainDonor() {
    try{
        mainDonor = []
        stakeholdersResponse.data.projectStakeholders.map((p: any) => {
          if (Number(p.projectId) === Number(data.project!.id) && (Number(p.stakeholderCategoryId) === 3)){
            let input :IDropdownOption<any> =  {
              key: p.stakeholder.id,
              text: p.stakeholder.name,
              isSelected: p.main
            };
            mainDonor.push(input)
          }
        });
    }catch(error){
        console.log(error)
    } 
  }
  getMainDonor()

  let stakeholders = stakeholdersResponse.data.projectStakeholders.map((p: any) => {
    return {
      key: p.stakeholder.id,
      text: p.stakeholder.name,
      isSelected: false
    };
  });

  function getCountries() {
      try{
          countries = []
          countriesData.map((currentCountry: any) => {
            let item = {
              key: currentCountry.cca2,
              text: currentCountry.name.common,
              isSelected: (String(currentCountry.cca2) === String(recipientCountryResponse.data.aidRecipientCountry.countryCode))
            };
            countries.push(item)
          });
          countries.sort((a,b) => (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0))
      }catch(error){
          console.log(error)
      } 
  } 
  getCountries()

  function getCurrencies(){
    currencies = []
    for (let i in currencie) { 
      let item = {
        key: currencie[i].code,
        text: '(' + currencie[i].code + ') ' + currencie[i].name,
        isSelected: (String(currencie[i].code) === String(data?.project!.currencyCode))
      };
      currencies.push(item)
    }
    currencies.sort((a,b) => (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0))
  }
  getCurrencies()

  return (
    <AutoSaveFormik
      initialValues={initValues}
      onSubmit={handleSubmit}
    >
        <Grid dir="ltr">
          {/* Names */}
          <Row>
            <TextField
              required
              label={t("shortname.field")}
              component={TextFieldInput}
              sizeLg={3}
              value={projectShortName}
              onChange={changeShortNameHandler}
              errorMessage={errorMessages.shortName}
            />

            <TextField
              required
              label={t("largename.field")}
              component={TextFieldInput}
              sizeLg={9}
              value={projectLargeName}
              onChange={changeLargeNameHandler}
              errorMessage={errorMessages.largeName}
            />
          </Row>
          {/* Description */}
          <Row>
            <TextField
              label={t("description.field")}
              component={TextFieldInput}
              {...multilineTextFieldProps}
              sizeLg={12}
              value={projectDescription}
              onChange={changeDescriptionHandler}
              errorMessage={errorMessages.description}
            />
          </Row>
          <br />

          <Row>
            {/* 1. Project */}
            <Col sizeSm={12} sizeMd={8} sizeLg={8}>
              <Row>
                <Separator {...separatorProps}>
                  <PrimaryButton text="1" className={classes.circle} />
                </Separator>
              </Row>

              <Stack {...headerStackProps}>
                <Stack.Item>
                  <Label>{t("status.field")}</Label>
                  {/*/ {t(`status.${data.project.projectStatus.name}`)} */}
                  {data.project.projectStatus.name}
                </Stack.Item>
                <Stack.Item>
                  <Label>{t("wikicode.field")}</Label>
                  {projectWikimlCode}
                </Stack.Item>
              </Stack>
              <br />

              <Row>
                <StandardField                          //aidRecipientCountries(id: ID!): AidRecipientCountry id = idProject "Pais seleccionado"
                  label={t("country.field")}            //Update> mutaction createAidRecipientCountry
                  name="country"
                  component={DropdownFieldInput}   
                  options={countries}
                  onChange={changePrincipalRecipientCountryHandler}
                />
                
                <StandardField
                  label={t("imporganization.field")}   //projectStakeholders: [ProjectStakeholder!]!
                  //name="impOrganization"
                  component={DropdownFieldInput}
                  options={mainImplementer}
                />
                <StandardField
                  label={t("intorganization.field")}   //projectStakeholders: [ProjectStakeholder!]!
                  name="intOrganization"
                  component={DropdownFieldInput}
                  options={mainIntermediary}
                />
              </Row>

              <Row>
                <StandardField
                  label={t("currency.field")}   //project.currencyCode
                  name="currency"
                  component={DropdownFieldInput}
                  options={currencies}
                  onChange={changeCurrencyHandler}
                />
                <StandardField
                  label={t("program.field")}
                  component={DropdownFieldInput}
                  options={programs}
                  onChange={changeProgramHandler}
                  />
                <Col sizeSm={2} sizeMd={6} sizeLg={3}>
                  <Field
                    label={t("sector.field")}
                    component={DropdownFieldInput}
                    options={sectors}
                    onChange={changeSectorHandler}
                  />
                </Col>
                {/* <StandardField
                  label={t("sector.field")}
                  name="sector"
                  component={DropdownFieldInput}
                  options={sectors}
                /> */}
                <StandardField
                  label={t("duration.field")}
                  //name="duration"
                  component={TextFieldInput}
                  suffix={t("duration.suffix")}
                  value={projectDurationPlan}
                  onChange={changeDurationHandler}
                  errorMessage={errorMessages.durationPlan}
                />
              </Row>

              <Row>
                <StandardField
                  label={t("budget.field")} //Project.solicitedBudget
                  //name="budget"
                  component={TextFieldInput}
                  prefix={t("budget.prefix")}
                  value={projectSolicitedBudget}
                  onChange={changeSolicitedBudgetHandler}
                />
                <StandardField
                  label={t("calculated.budgetitems-prefix")}
                  name="budgetPerItems"
                  component={TextFieldInput}
                  prefix={t("calculated.field")}
                  readOnly
                />
                <StandardField
                  label={t("calculated.budgetact-prefix")}
                  name="budgetPerAct"
                  component={TextFieldInput}
                  prefix={t("calculated.field")}
                  readOnly
                />
                <StandardField
                  label={t("financed.field")}
                  name="budgetFinanced"
                  component={TextFieldInput}
                  prefix={t("calculated.field")}
                  value={projectBudgetFinanced}
                  readOnly
                />
              </Row>
            </Col>

            {/* 2. Donor */}
            <Col sizeSm={12} sizeMd={4} sizeLg={4}>
              <Row>
                <Separator {...separatorProps}>
                  <PrimaryButton text="2" className={classes.circle} />
                </Separator>
              </Row>

              <Stack {...headerStackProps}>
                <Stack.Item>
                  <Label>{t("donorcode.field")}</Label>
                  {projectDonorAssignedCode}

                  
                </Stack.Item>
              </Stack>
              <br />

              <Row>
                
              </Row>
              <Row>
              <StandardField
                  label={t("donorcode.field")}
                  component={TextFieldInput}
                  value={projectDonorAssignedCode}
                  onChange={changeDonorAssignedCodeHandler}
                  sizeLg={6}
                />

                <StandardField
                  label={t("donor.field")}
                  name="donor"
                  component={DropdownFieldInput}
                  options={mainDonor}
                  sizeLg={6}
                />
                
              </Row>

              <Row>
              <StandardField
                  label={t("approvedate.field")}  //ApprovedProject.approvedDate
                  //name="approveDate"
                  component={DateFieldInput}
                  value={projectApprovedDate}
                  onSelectDate={changeApprovedDateHandler}
                  sizeLg={4}
                />

                <StandardField
                  label={t("initialdate.field")}
                  //name="initialDate"                             //ApprovedProject.planInitialDate
                  component={DateFieldInput}
                  value={projectPlanInitialDate}
                  minDate={projectApprovedDate}
                  onSelectDate={changePlanInitialDateHandler}
                  sizeLg={4}
                />
                <StandardField
                  label={t("finaldate.field")}      //ApprovedProject.planFinallDate
                  //name="finalDate"
                  component={DateFieldInput}
                  value={projectPlanFinalDate}
                  minDate={projectPlanInitialDate}
                  onSelectDate={changePlanFinalDateHandler}
                  sizeLg={4}
                />
              </Row>

              <Row>
                <StandardField
                  label={t("approvebudget.field")}
                  name="approvedBudget" //ApprovedProject.approvedBudget
                  component={TextFieldInput}
                  value={projectApprovedBudget}
                  //suffix={generalInfo.currency}
                  sizeLg={6}
                />
                <StandardField
                  label={t("contribution.field")}
                  name="contribution" //CoFunder.contribution
                  component={TextFieldInput}
                  sizeLg={6}
                  value={projectBudgetFinancedMainDonor}
                  readOnly
                />
              </Row>
            </Col>
          </Row>
        </Grid>
    </AutoSaveFormik>
  );
}

const StandardField = (props: any) => {
  return (
    <Col
      sizeSm={props.sizeSm || 2}
      sizeMd={props.sizeMd || 6}
      sizeLg={props.sizeLg || 3}
    >
      <Field {...props} />
    </Col>
  );
};

const TextField = ({ grow, ...props }: any) => {
  return (
    <Col
      sizeSm={props.sizeSm || 2}
      sizeMd={props.sizeMd || 6}
      sizeLg={props.sizeLg || 3}
    >
      <Field {...props} />
    </Col>
  );
};
