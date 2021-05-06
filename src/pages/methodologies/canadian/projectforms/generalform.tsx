import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { string, object, number } from "yup";
import { Formik, Form, Field, useField, FormikProps } from "formik";
import { Stack, useTheme, TextField, ITextFieldProps } from "@fluentui/react";

import { selectProject } from "store/slices/projectslice";
import IProject, { Sector } from "models/project";

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
  const { palette } = useTheme();

  // LOGIC
  const { t } = useTranslation("forms");
  const project = useSelector(selectProject);

  console.log("Hello");
  console.log("project: ", project);
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

  const validationSchema = object({
    shortName: string().max(20, t("shortname-error")).required(t("required")),
    largeName: string().min(20, t("largename-error")).required(t("required")),
    description: string(),
    country: string().required(t("required")),
    impOrganization: string().required(t("required")),
    intOrganization: string().required(t("required")),
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

  const handleOnSubmit = (values: formValuesType, { setSubmitting }: any) => {
    alert(values);
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
    >
      <Form>
        <Field
          label={t("shortname-field")}
          name="shortName"
          component={StandardInput}
        />
      </Form>
    </Formik>
  );
}

const StandardInput = ({ field, form, ...props }: any) => {
  return (
    <>
      <TextField {...field} {...props} />
      {form.touched && form.errors ? (
        <div className="error">{form.errors[field.name]}</div>
      ) : null}
    </>
  );
};

export function generalFormViewMode() {
  return <div>Form Basics</div>;
}
