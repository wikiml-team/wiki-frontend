import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { string, object, number, setLocale } from "yup";
import { Grid, Col, Row } from "fluentui-react-grid";
import { Field, FormikValues } from "formik";
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

import { selectProject } from "store/slices/projectslice";
import { ECanadianSector } from "models/sector";
import { IProjectInfo } from "models/project";
import DropdownFieldInput from "components/inputs/dropdown";
import TextFieldInput from "components/inputs/text";
import DateFieldInput from "components/inputs/datepicker";
import AutoSaveFormik from "components/form/autosaveform";


type formValuesType = FormikValues | {
  shortName: string;
  largeName: string;
  description: string;
  country: string;
  impOrganization: string;
  intOrganization: string;
  budget: number;
  budgetPerItems: number;
  budgetPerAct: number;
  budgetFinanced: number;
  budgetSolicited: number;
  program: string;
  sector: ECanadianSector;
  duration: number;
  donor: string;
  approvedBudget: number;
  approvedDate: Date | string;
  initialDate: Date | string;
  finalDate: Date | string;
  contribution: number;
};

export default function GeneralForm() {
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

  // LOGIC
  const { t } = useTranslation("forms", { keyPrefix: "general"});
  const project = useSelector(selectProject);
  const generalInfo = project.info as IProjectInfo<ECanadianSector>;

  const [initialDate, setInitialDate] = useState(generalInfo.initialDate as Date)
  const [approvedDate, setApprovedDate] = useState(generalInfo.approvedDate as Date)

  const handleSelectInitialDate = (date: Date) => {
    setInitialDate(date);
  }

  const handleSelectApprovedDate = (date: Date) => {
    setApprovedDate(date);
  }

  const initValues: formValuesType = {
    shortName: generalInfo.shortname,
    largeName: generalInfo.name,
    description: generalInfo.description,
    country: generalInfo.country,
    impOrganization: generalInfo.organization,
    intOrganization: generalInfo.intermediary,
    budget: generalInfo.budget,
    budgetPerItems: generalInfo.budgetItems,
    budgetPerAct: generalInfo.budgetAct,
    budgetFinanced: generalInfo.budgetFinanced,
    budgetSolicited: generalInfo.solicitedBudget,
    program: generalInfo.program,
    sector: generalInfo.sector,
    duration: generalInfo.duration,
    donor: generalInfo.donor,
    approvedBudget: generalInfo.approvedBudget,
    approvedDate: generalInfo.approvedDate,
    initialDate: generalInfo.initialDate,
    finalDate: generalInfo.finalDate,
    contribution: generalInfo.contribution
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
  }, [validationSchema]);

  const handleSubmit = (values: formValuesType, { setSubmitting }: any) => {
    alert(values);
  };

  const countries: IDropdownOption[] = [
    { key: "1", text: "Cuba" },
    { key: "2", text: "England" },
    { key: "3", text: "United States" },
    { key: "4", text: "España" },
    { key: "5", text: "Canada" },
  ];

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
            <TextField
              required
              label={t("shortname.field")}
              name="shortName"
              component={TextFieldInput}
              sizeLg={3}
            />

            <TextField
              required
              label={t("largename.field")}
              name="largeName"
              component={TextFieldInput}
              sizeLg={9}
            />
          </Row>
          {/* Description */}
          <Row>
            <TextField
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
                  options={countries}
                />
                <StandardField
                  label={t("sector.field")}
                  name="sector"
                  component={DropdownFieldInput}
                  options={countries}
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
                  name="budget"
                  component={TextFieldInput}
                  prefix={t("calculated.budget-prefix")}
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
    <Col sizeSm={props.sizeSm || 2} sizeMd={props.sizeMd || 6} sizeLg={props.sizeLg || 3}>
      <Field {...props} />
    </Col>
  );
};

const TextField = ({ grow, ...props }: any) => {
  return (
    <Col sizeSm={props.sizeSm || 2} sizeMd={props.sizeMd || 6} sizeLg={props.sizeLg || 3}>
      <Field {...props} />
    </Col>
  );
};

export function generalFormViewMode() {
  return <div>Form Basics</div>;
}
