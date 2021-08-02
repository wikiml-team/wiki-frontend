import { addMonths, DatePicker, IDatePickerStrings, IDatePickerStyles } from "@fluentui/react";
import { useTranslation } from "react-i18next";
import { useConst } from "@fluentui/react-hooks";

const DateFieldInput = ({ field, form, ...props }: any) => {
  const { t } = useTranslation([
    "months",
    "shortMonths",
    "days",
    "shortDays",
    "calendar",
    "general-form"
  ]);

  const DayPickerStrings: IDatePickerStrings = {
    months: [
      t("january"),
      t("february"),
      t("march"),
      t("april"),
      t("may"),
      t("june"),
      t("july"),
      t("august"),
      t("september"),
      t("october"),
      t("november"),
      t("december"),
    ],

    shortMonths: [
      t("shortmonths:jan"),
      t("shortmonths:feb"),
      t("shortmonths:mar"),
      t("shortmonths:apr"),
      t("shortmonths:may"),
      t("shortmonths:jun"),
      t("shortmonths:jul"),
      t("shortmonths:aug"),
      t("shortmonths:sep"),
      t("shortmonths:oct"),
      t("shortmonths:nov"),
      t("shortmonths:dec"),
    ],

    days: [
      t("days:sunday"),
      t("days:monday"),
      t("days:tuesday"),
      t("days:wednesday"),
      t("days:thursday"),
      t("days:friday"),
      t("days:saturday"),
    ],

    shortDays: [
      t("shortdays:sunday"),
      t("shortdays:monday"),
      t("shortdays:tuesday"),
      t("shortdays:wednesday"),
      t("shortdays:thursday"),
      t("shortdays:friday"),
      t("shortdays:saturday"),
    ],

    goToToday: t("calendar:goToToday"),
    prevMonthAriaLabel: t("calendar:prevMonthAriaLabel"),
    nextMonthAriaLabel: t("calendar:nextMonthAriaLabel"),
    prevYearAriaLabel: t("calendar:prevYearAriaLabel"),
    nextYearAriaLabel: t("calendar:nextYearAriaLabel"),
    closeButtonAriaLabel: t("calendar:closeButtonAriaLabel"),
  };

  const handleGetError = (value: string) => {
    return form.touched && form.errors ? form.errors[field.name] : "";
  };

  const minDate = useConst(addMonths(new Date(Date.now()), -1));


  const datepickerStyles: Partial<IDatePickerStyles> = {
    root: {
      height: 60.4
    }
  }

  return (
    <DatePicker
      placeholder={t("general-form:date-placeholder")}
      minDate={minDate}
      onGetErrorMessage={handleGetError}
      deferredValidationTime={500}
      strings={DayPickerStrings}
      styles={datepickerStyles}
      {...field}
      {...props}
    />
  );
};

export default DateFieldInput;
