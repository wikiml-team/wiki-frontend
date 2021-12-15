import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { string, object, number, setLocale } from "yup";
import { FormikValues } from "formik";

import CurrencyList from "currency-list";
import { countries as CountryList } from "countries-list";

import { useQuery } from "@apollo/client";
import {
  GetPrograms,
  GetProjectById,
  GetProjectByIdVariables,
  GetProjectById_project,
  GetSectors,
} from "types";
import { GET_PROJECT_BY_ID } from "apollo/projects/project";
import { GET_SECTORS } from "apollo/sectors";
import { GET_PROGRAMS } from "apollo/programs";
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

import { selectLanguage } from "store/slices/languageslice";
import DropdownFieldInput from "components/inputs/dropdown";
import TextFieldInput from "components/inputs/text";
import DateFieldInput from "components/inputs/datepicker";
import AutoSaveFormik from "components/form/autosaveform";
import getCurrencyRegExp from "../../../../components/currencyregex";
import { StandardField } from "components/inputs/standard";
import { ErrorLabelRender } from "components/errorlabel";
import CountryDropdownFieldInput from "components/inputs/countryselect";

type ProjectFormValues = {
  short: string;
  large: string;
  description: string;
  program: string;
  sector: string;
  duration: string;
  currencycode: string;
  currencyregex: RegExp;
  country: string;
  implementary: string;
  intermediate: string;
  donor: string;
  budget: string;
  budgetPerItems: string;
  budgetPerAct: string;
  budgetFinanced: string;
  budgetSolicited: string;
  approvedBudget: string;
  approvedDate: Date;
  initialDate: Date;
  finalDate: Date;
};

type formValuesType = FormikValues | ProjectFormValues;

const mapProjectToForm = (
  project: GetProjectById_project,
  data: { currencyregex: RegExp }
) => {
  const form = {
    short: project.shortName,
    large: project.largeName,
    description: project.description,
    program: project.programId,
    sector: project.sectorId,
    duration: project.durationPlan,
    currencycode: project.currencyCode,
    currencyregex: data.currencyregex,
    country: string,
    implementary: string,
    intermediate: string,
    donor: string,
    budget: string,
    budgetPerItems: string,
    budgetPerAct: string,
    budgetFinanced: string,
    budgetSolicited: string,
    approvedBudget: string,
    approvedDate: Date,
    initialDate: Date,
    finalDate: Date,
  };

  return form;
};

export default function GeneralForm() {
  // LOGIC
  const { t } = useTranslation("forms", { keyPrefix: "general" });
  const { projectId } = useParams<{ projectId: string }>();

  const lang = useSelector(selectLanguage);
  const currencyList = Object.entries(CurrencyList.getAll(lang));
  const countryList = Object.entries(CountryList);

  // states
  const [project, setProject] = useState<GetProjectById_project>();
  const [projectForm, setProjectForm] = useState<ProjectFormValues>();

  const [currencyProps, setCurrencyProps] = useState<{
    code: string;
    regex: RegExp;
  }>({
    code: "",
    regex: /^(?!0\.00)\d{1,3}(\d{3})*(\.\d\d)?$/,
  });

  const [initialDate, setInitialDate] = useState(
    // generalInfo.initialDate as Date
    new Date()
  );
  const [approvedDate, setApprovedDate] = useState(
    // generalInfo.approvedDate as Date
    new Date()
  );

  const handleCurrencyChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption
  ) => {
    const code = item.key.toString();
    setCurrencyProps({
      code: code,
      regex: getCurrencyRegExp(code, currencyList),
    });
  };

  // Handlers
  const handleSelectInitialDate = (date: Date) => {
    setInitialDate(date);
  };

  const handleSelectApprovedDate = (date: Date) => {
    setApprovedDate(date);
  };

  const handleSubmit = (values: formValuesType, { setSubmitting }: any) => {
    alert(values);
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
    budget: string()
      .required(t("required"))
      .matches(currencyProps.regex, t("budget.error")),
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

  // DATA
  // Project
  const {
    data: projectsData,
    loading: projectsLoading,
    error: projectsError,
  } = useQuery<GetProjectById, GetProjectByIdVariables>(GET_PROJECT_BY_ID, {
    variables: { id: projectId },
    onCompleted: (d) => {
      if (d.project) {
        setProject(d.project);
        // @ts-ignore
        setCurrencyProps({
          code: d.project.currencyCode?.toString() || "",
          regex: getCurrencyRegExp(
            d.project.currencyCode?.toString() || "",
            currencyList
          ),
        });

        validationSchema.fields.budget.matches(
          getCurrencyRegExp(d.project.currencyCode || "", currencyList)
        );
      }
    },
  });

  // stakeholdersData
  const {
    data: stakeholdersData,
    loading: stakeholdersLoading,
    error: stakeholdersError,
  } = useQuery<GetSectors>(GET_SECTORS);

  // Sectors
  const {
    data: sectorsData,
    error: sectorsError,
  } = useQuery<GetSectors>(GET_SECTORS);

  // Programs
  const {
    data: programsData,
    error: programsError,
  } = useQuery<GetPrograms>(GET_PROGRAMS);

  useEffect(() => {
    setLocale({
      mixed: {
        default: "field_invalid",
      },
    });
  }, [validationSchema]);

  if (!projectsData || projectsLoading || projectsError) {
    return (
      <QueryStateIndicator
        data={projectsData}
        loading={projectsLoading}
        error={projectsError}
      />
    );
  }

  if (!project) return <></>;

  // Variables
  // const stakeholders = ;

  const sectors = sectorsData?.sectors.map((s) => {
    return {
      key: s.id,
      text: s.name,
    };
  });

  const programs = programsData?.programs.map((p) => {
    return {
      key: p.id,
      text: p.name,
    };
  });

  const countries: IDropdownOption[] = countryList.map((country) => {
    return {
      key: country[0],
      text: country[1].name,
    };
  });

  const currencies: IDropdownOption[] = currencyList.map((currency) => {
    return {
      key: currency[0],
      text: currency[1].name + ` ( ${currency[1].symbol} )`,
    };
  });

  const status: string = projectsData?.project?.projectStatus?.name || "";

  const initValues: formValuesType = {
    shortName: project.shortName,
    largeName: project.largeName,
    methodology: project.methodology,
    description: project.description,
    language: project.languageId,
    program: project.programId?.toString(),
    status: status,
    public: project.public,
    sector: project.sectorId.toString(),
    currency: project.currencyCode,
    duration: project.durationPlan,
    intermediateOutcomes: project.intermediateOutcomes,
    projectPermissions: project.projectPermissions,
    solicitedBudget: project.solicitedBudget,
    ultimateOutcome: project.ultimateOutcome,
    wikimlCode: project.wikimlCode,
    createdAt: project.createdAt,
    // country: project.,

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
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <>
        <Grid dir="ltr">
          {/* Names */}
          <Row>
            <StandardField
              required
              label={t("shortname.field")}
              name="shortName"
              component={TextFieldInput}
              sizeLg={3}
            />

            <StandardField
              required
              label={t("largename.field")}
              name="largeName"
              component={TextFieldInput}
              sizeLg={9}
            />
          </Row>
          {/* Description */}
          <Row>
            <StandardField
              label={t("description.field")}
              name="description"
              component={TextFieldInput}
              {...multilineTextFieldProps}
              sizeLg={12}
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
                  {t(`status.${status}`, status)}
                </Stack.Item>
                <Stack.Item>
                  <Label>{t("wikicode.field")}</Label>
                  {project.wikimlCode}
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
                  options={[]}
                />
                <StandardField
                  label={t("intorganization.field")}
                  name="intOrganization"
                  component={DropdownFieldInput}
                  options={[]}
                />
              </Row>

              <Row>
                <StandardField
                  label={t("currency.field")}
                  name="currency"
                  component={DropdownFieldInput}
                  options={currencies}
                  selectedKey={currencyProps.code ?? project.currencyCode}
                  onChange={(a: any, b: IDropdownOption) =>
                    handleCurrencyChange(a, b)
                  }
                />
                <StandardField
                  label={t("program.field")}
                  name="program"
                  component={DropdownFieldInput}
                  options={programs}
                  aria-errormessage={t("errors.nodata")}
                  {...(programsError && {
                    onRenderLabel: (props: ITextFieldProps) =>
                      ErrorLabelRender(props),
                  })}
                />
                <StandardField
                  label={t("sector.field")}
                  name="sector"
                  component={DropdownFieldInput}
                  options={sectors}
                  aria-errormessage={t("errors.nodata")}
                  {...(sectorsError && {
                    onRenderLabel: (props: ITextFieldProps) =>
                      ErrorLabelRender(props),
                  })}
                />
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
                  name="solicitedBudget"
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
                  XXX
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
                  suffix={currencyProps.code ?? project.currencyCode}
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
