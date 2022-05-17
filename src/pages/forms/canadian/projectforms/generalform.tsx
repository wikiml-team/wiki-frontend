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
import { GET_PROJECT_BY_ID } from "apollo/projects/project";
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
import { UPDATE_PROJECT } from "apollo/projects/mutations";

type formValuesType = FormikValues | GetProjects_projects;

export default function GeneralForm() {
  // LOGIC
  const { t } = useTranslation("forms", { keyPrefix: "general" });
  const { projectId } = useParams<any>();

  const project = useSelector(selectProject);
  const generalInfo = project.info as IProjectInfo<ECanadianSector>;

  const [initialDate, setInitialDate] = useState(
    generalInfo.initialDate as Date
  );
  const [approvedDate, setApprovedDate] = useState(
    generalInfo.approvedDate as Date
  );

  const handleSelectInitialDate = (date: Date) => {
    setInitialDate(date);
  };

  const handleSelectApprovedDate = (date: Date) => {
    setApprovedDate(date);
  };

  const validationSchema = object().shape({
    shortName: string().max(20, t("shortname.error")).required(t("required")),
    largeName: string()
      .min(20, t("largename.error"))
      .max(100, t("largename.error"))
      .required(t("required")),
    description: string(),
    country: string().required(t("required")),
    impOrganization: string().required(t("required")),
    intOrganization: string().required(t("required")),
    currency: string().required(t("required")),
    budget: number().required(t("required")),
    budgetPerItems: number().required(t("required")),
    budgetPerAct: number().required(t("required")),
    budgetFinanced: number().required(t("required")),
    budgetSolicited: number().required(t("required")),
    program: string().required(t("required")),
    sector: string().required(t("required")),
    duration: number().required(t("required")),
    donor: string().required(t("required")),
    approvedBudget: number().required(t("required")),
    approvedDate: string().required(t("required")),
    initialDate: string().required(t("required")),
    finalDate: string().required(t("required")),
  });

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

  // DATA----------------------------------------------------------------------------------------------------------------------------
  const { data, loading, error } = useQuery<GetProjectById, GetProjectByIdVariables>(GET_PROJECT_BY_ID, {
    variables: { id: projectId },
  });

  const sectorsResponse = useQuery<GetSectors>(GET_SECTORS);
  const programsResponse = useQuery<GetPrograms>(GET_PROGRAMS);

  //Mutations------------------------------------------------------------------------------------------------------------------------
  const [updateProject, mutationUpdateProject] = useMutation(UPDATE_PROJECT)

  //Form validation------------------------------------------------------------------------------------------------------------------
  let [errorMessages, setErrorMessages] = useState({shortName: '', largeName: '', description: ''})

  //Handle data-----------------------------------------------------------------------------------------------------------------------
  const changeShortNameHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
    newValue = event.currentTarget.value;
    setprojectShortName(newValue)
    return newValue
  }

  const changeLargeNameHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
    newValue = event.currentTarget.value;
    setprojectLargeName(newValue)
    return newValue
  }

  const changeDescriptionHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
    newValue = event.currentTarget.value;
    setprojectDescription(newValue)
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
  },[data]);

  //Updating values of project
  useEffect(() => {
    const timer = setTimeout(() => {
      //Validating data--------------------------------------------
      let formValidated = true
      let shortNameError = ''
      let shortLargeNameError = ''
      let DescriptionError = ''

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

      setErrorMessages({
        shortName: shortNameError, 
        largeName: shortLargeNameError, 
        description: DescriptionError
      })
      //End validations----------------------------------------------

      if (data && formValidated){
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
      }

    }, 1000)
    return () => clearTimeout(timer)
  },[projectShortName, projectLargeName, projectDescription]);

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

  if (!data || loading || error)
    return <QueryStateIndicator data={data} loading={loading} error={error} />;

  const sectors = sectorsResponse.data?.sectors.map((s) => {
    return {
      key: s.id,
      text: s.name,
    };
  });
  const programs = programsResponse.data.programs.map((p) => {
    return {
      key: p.id,
      text: p.name,
    };
  });
  const countries: IDropdownOption[] = [];

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

    // country: data.project!.,
    // impOrganization: data.project!.organization,
    // intOrganization: data.project!.intermediary,
    // budget: data.project!.budget,
    // budgetPerItems: data.project!.budgetItems,
    // budgetPerAct: data.project!.budgetAct,
    // approvedBudget: data.project!.approvedBudget,
    // budgetFinanced: data.project!.budgetFinanced,
    // donor: data.project!.donor,
    // approvedDate: data.project!.approvedDate,
    // initialDate: data.project!.initialDate,
    // finalDate: data.project!.finalDate,
    // contribution: data.project!.contribution,
  };

  return (
    <AutoSaveFormik
      initialValues={initValues}
      onSubmit={handleSubmit}
    >
      <>
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
                  {t(`status.${generalInfo.status}`)}
                </Stack.Item>
                <Stack.Item>
                  <Label>{t("wikicode.field")}</Label>
                  {generalInfo.wikicode}
                </Stack.Item>
              </Stack>
              <br />

              <Row>
                <StandardField
                  label={t("country.field")}
                  name="country"
                  component={DropdownFieldInput}
                  options={countries}
                />
                <StandardField
                  label={t("imporganization.field")}
                  name="impOrganization"
                  component={DropdownFieldInput}
                  options={countries}
                />
                <StandardField
                  label={t("intorganization.field")}
                  name="intOrganization"
                  component={DropdownFieldInput}
                  options={countries}
                />
              </Row>

              <Row>
                <StandardField
                  label={t("currency.field")}
                  name="currency"
                  component={DropdownFieldInput}
                />
                <StandardField
                  label={t("program.field")}
                  name="program"
                  component={DropdownFieldInput}
                  options={programs}
                />
                <Col sizeSm={2} sizeMd={6} sizeLg={3}>
                  <Field
                    label={t("sector.field")}
                    name="sector"
                    component={DropdownFieldInput}
                    options={sectors}
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
                  name="duration"
                  component={TextFieldInput}
                  suffix={t("duration.suffix")}
                />
              </Row>

              <Row>
                <StandardField
                  label={t("budget.field")}
                  name="budget"
                  component={TextFieldInput}
                  prefix={t("budget.prefix")}
                />
                <StandardField
                  label={t("calculated.field")}
                  name="budgetPerItems"
                  component={TextFieldInput}
                  prefix={t("calculated.budgetitems-prefix")}
                  readOnly
                />
                <StandardField
                  label={t("calculated.field")}
                  name="budgetPerAct"
                  component={TextFieldInput}
                  prefix={t("calculated.budgetact-prefix")}
                  readOnly
                />
                <StandardField
                  label={t("financed.field")}
                  name="budgetFinanced"
                  component={TextFieldInput}
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
                  {generalInfo.donorcode}
                </Stack.Item>
              </Stack>
              <br />

              <Row>
                <StandardField
                  label={t("donor.field")}
                  name="donor"
                  component={DropdownFieldInput}
                  options={countries}
                  sizeLg={6}
                />
                <StandardField
                  label={t("approvedate.field")}
                  name="approveDate"
                  component={DateFieldInput}
                  onSelectDate={handleSelectApprovedDate}
                  sizeLg={6}
                />
              </Row>

              <Row>
                <StandardField
                  label={t("initialdate.field")}
                  name="initialDate"
                  component={DateFieldInput}
                  minDate={approvedDate}
                  onSelectDate={handleSelectInitialDate}
                  sizeLg={6}
                />
                <StandardField
                  label={t("finaldate.field")}
                  name="finalDate"
                  component={DateFieldInput}
                  minDate={initialDate}
                  sizeLg={6}
                />
              </Row>

              <Row>
                <StandardField
                  label={t("approvebudget.field")}
                  name="approvedBudget"
                  component={TextFieldInput}
                  options={countries}
                  suffix={generalInfo.currency}
                  sizeLg={6}
                />
                <StandardField
                  label={t("contribution.field")}
                  name="contribution"
                  component={TextFieldInput}
                  sizeLg={6}
                />
              </Row>
            </Col>
          </Row>
        </Grid>
      </>
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
