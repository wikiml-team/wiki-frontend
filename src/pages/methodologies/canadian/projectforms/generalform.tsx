import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { string, object, number, setLocale } from "yup";
import { Formik, Form, Field } from "formik";
import {
  Stack,
  ITextFieldProps,
  IDropdownOption,
  IStackProps,
  IStackItemStyles,
  mergeStyleSets,
  Separator,
  PrimaryButton,
  ISeparatorProps,
  Label,
  IStackStyles,
} from "@fluentui/react";

import { selectProject } from "store/slices/projectslice";
import { Sector } from "models/project";
import DropdownFieldInput from "components/inputs/dropdown";
import TextFieldInput from "components/inputs/text";
import DateFieldInput from "components/inputs/datepicker";
import { useEffect } from "react";

type formValuesType = {
  shortName: string;
  largeName: string;
  description: string;
  country: string;
  impOrganization: string;
  intOrganization: string;
  budget: number;
  budgetPerItems: number;
  budgetPerAct: number;
  budgetSolicited: number;
  program: string;
  sector: Sector;
  duration: number;
  donor: string;
  approvedBudget: number;
  approvedDate: Date;
  initialDate: Date;
  finalDate: Date;
};

export default function GeneralForm() {
  // STYLE
  const classes = mergeStyleSets({
    root: {
      padding: "0 5% 30px 5%",
    },
    circle: {
      height: 40,
      width: 40,
      borderRadius: "50%",
      minWidth: 40,
      fontSize: 16,
    },
  });

  const multilineTextFieldProps: Partial<ITextFieldProps> = {
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

  const horizontalStackProps: Partial<IStackProps> = {
    tokens: { childrenGap: "m" },
    padding: 2,
    horizontal: true,
    wrap: true,
  };

  const verticalStackProps: Partial<IStackProps> = {
    tokens: { childrenGap: "m" },
    padding: 2,
  };

  const stepStackStyles: Partial<IStackStyles> = {
    root: {
      paddingTop: 10,
    },
  };

  const headerStackProps: Partial<IStackProps> = {
    tokens: { childrenGap: "m" },
    horizontal: true,
    horizontalAlign: "space-between",
    styles: {
      root: {
        paddingRight: 40,
      },
    },
  };

  const separatorProps: Partial<ISeparatorProps> = {
    alignContent: "start",
    styles: {
      content: {
        paddingLeft: 0,
      },
    },
  };

  // LOGIC
  const { t } = useTranslation(["general-form", "status"]);
  const project = useSelector(selectProject);

  const dispatch = useDispatch();

  const initValues: formValuesType = {
    shortName: project.shortname,
    largeName: project.name,
    description: project.description,
    country: project.country,
    impOrganization: project.organization,
    intOrganization: project.intermediary,
    budget: project.budget,
    budgetPerItems: project.budgetItems,
    budgetPerAct: project.budgetAct,
    budgetSolicited: project.solicitedBudget,
    program: project.program,
    sector: project.sector,
    duration: project.duration,
    donor: project.donor,
    approvedBudget: project.approvedBudget,
    approvedDate: project.approvedDate,
    initialDate: project.initialDate,
    finalDate: project.finalDate,
  };

  const validationSchema = object().shape({
    shortName: string().max(20, t("shortname-error")).required(t("required")),
    largeName: string()
      .min(20, t("largename-error"))
      .max(100, t("largename-error"))
      .required(t("required")),
    description: string(),
    country: string().required(t("required")),
    impOrganization: string().required(t("required")),
    intOrganization: string().required(t("required")),
    currency: string().required(t("required")),
    budget: number().required(t("required")),
    budgetPerItems: number().required(t("required")),
    budgetPerAct: number().required(t("required")),
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
      string: {
        default: "asi mismo",
      },
      number: {
        default: "asimismo",
      },
    });
  }, [validationSchema]);

  const handleOnSubmit = (values: formValuesType, { setSubmitting }: any) => {
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
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
    >
      <Form className={classes.root}>
        <Stack {...horizontalStackProps}>
          <TextField
            grow={1}
            required
            label={t("shortname-field")}
            name="shortName"
            component={TextFieldInput}
          />

          <TextField
            grow={4}
            required
            label={t("largename-field")}
            name="largeName"
            component={TextFieldInput}
          />
        </Stack>

        <Stack {...horizontalStackProps}>
          <TextField
            grow
            label={t("description-field")}
            name="description"
            component={TextFieldInput}
            {...multilineTextFieldProps}
          />
        </Stack>

        <Stack {...horizontalStackProps}>
          {/* 1. Project */}
          <Stack.Item>
            <Stack {...verticalStackProps}>
              <Stack styles={stepStackStyles}>
                <Separator {...separatorProps}>
                  <PrimaryButton text="1" className={classes.circle} />
                </Separator>
              </Stack>

              <Stack {...headerStackProps}>
                <Stack.Item>
                  <Label>{t("status-field")}</Label>
                  {t(`status:${project.status}`)}
                </Stack.Item>
                <Stack.Item>
                  <Label>{t("wikicode-field")}</Label>
                  {project.wikicode}
                </Stack.Item>
              </Stack>

              <Stack {...horizontalStackProps}>
                <StandardField
                  label={t("country-field")}
                  name="country"
                  component={DropdownFieldInput}
                  options={countries}
                />
                <StandardField
                  label={t("imporganization-field")}
                  name="impOrganization"
                  component={DropdownFieldInput}
                  options={countries}
                />
                <StandardField
                  label={t("intorganization-field")}
                  name="intOrganization"
                  component={DropdownFieldInput}
                  options={countries}
                />
              </Stack>

              <Stack {...horizontalStackProps}>
                <StandardField
                  label={t("currency-field")}
                  name="currency"
                  component={DropdownFieldInput}
                />
                <StandardField
                  label={t("budget-field")}
                  name="budget"
                  component={TextFieldInput}
                  prefix={t("budget-prefix")}
                />
                <StandardField
                  label={t("caulculated-field")}
                  name="budgetPerItems"
                  component={TextFieldInput}
                  prefix={t("budgetitems-prefix")}
                />
                <StandardField
                  label={t("caulculated-field")}
                  name="budgetPerAct"
                  component={TextFieldInput}
                  prefix={t("budgetact-prefix")}
                />
              </Stack>

              <Stack {...horizontalStackProps}>
                <StandardField
                  label={t("program-field")}
                  name="program"
                  component={DropdownFieldInput}
                  options={countries}
                />
                <StandardField
                  label={t("sector-field")}
                  name="sector"
                  component={DropdownFieldInput}
                  options={countries}
                />
                <StandardField
                  label={t("duration-field")}
                  name="duration"
                  component={TextFieldInput}
                />
              </Stack>
            </Stack>
          </Stack.Item>

          {/* 2. Donor */}
          <Stack.Item grow={2}>
            <Stack {...verticalStackProps}>
              <Stack styles={stepStackStyles}>
                <Separator {...separatorProps}>
                  <PrimaryButton text="2" className={classes.circle} />
                </Separator>
              </Stack>

              <Stack {...headerStackProps}>
                <Stack.Item>
                  <Label>{t("donorwikicode-field")}</Label>
                  {project.donorcode}
                </Stack.Item>
              </Stack>

              <Stack {...horizontalStackProps}>
                <StandardField
                  label={t("donor-field")}
                  name="donor"
                  component={DropdownFieldInput}
                  options={countries}
                />
              </Stack>

              <Stack {...horizontalStackProps}>
                <StandardField
                  label={t("approvebudget-field")}
                  name="approvedBudget"
                  component={TextFieldInput}
                  options={countries}
                />
                <StandardField
                  label={t("approvedate-field")}
                  name="approveDate"
                  component={DateFieldInput}
                />
              </Stack>

              <Stack {...horizontalStackProps}>
                <StandardField
                  label={t("initialdate-field")}
                  name="initialDate"
                  component={DateFieldInput}
                />
                <StandardField
                  label={t("finaldate-field")}
                  name="finalDate"
                  component={DateFieldInput}
                />
              </Stack>
            </Stack>
          </Stack.Item>
        </Stack>
      </Form>
    </Formik>
  );
}

const StandardField = (props: any) => {
  const stackItemStyles: Partial<IStackItemStyles> = {
    root: {
      // width: "25%",
      // minWidth: 200,
    },
  };

  return (
    <Stack.Item styles={stackItemStyles}>
      <Field {...props} />
    </Stack.Item>
  );
};

const TextField = ({ grow, ...props }: any) => {
  const stackItemStyles: Partial<IStackItemStyles> = {
    root: {
      minWidth: 200,
    },
  };

  return (
    <Stack.Item grow={grow} styles={stackItemStyles}>
      <Field {...props} />
    </Stack.Item>
  );
};

export function generalFormViewMode() {
  return <div>Form Basics</div>;
}
