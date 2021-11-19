import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  Checkbox,
  DetailsList,
  FontSizes,
  IColumn,
  ILinkStyles,
  Link,
  mergeStyleSets,
  SelectionMode,
  Text,
  Toggle,
} from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";

import { selectWorkplaceConfig } from "store/slices/workplaceslice";
import { IForm } from "models/workplace";

export default function Privacy() {
  // LOGIC
  const { t } = useTranslation("settings", { keyPrefix: "privacy-page" });
  const t_basics = useTranslation("basics").t;
  const t_forms = useTranslation("forms").t;

  const { tabsSchema } = useSelector(selectWorkplaceConfig);
  const [privateProject, { toggle: togglePrivateProject }] = useBoolean(true);
  const [forms, setForms] = useState<IForm[]>(tabsSchema.findForms());

  const columns: IColumn[] = [
    {
      key: "column1",
      name: t("table-forms"),
      fieldName: "forms",
      minWidth: 100,
      maxWidth: 300,
      data: "string",
      onRender: (item: IForm) => formRender(item),
    },
    {
      key: "column2",
      name: t("table-privacy"),
      fieldName: "Private",
      minWidth: 100,
      data: "string",
      onRender: (item: IForm) => CheckboxRender(item),
    },
  ];

  // Handlers
  const handleChangePrivacy = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    checked?: boolean | undefined
  ) => {
    togglePrivateProject();

    if (checked) {
      const newForms = forms.map((f) => {
        return {
          ...f,
          public: false,
        };
      });
      setForms(newForms);
    }
  };

  // STYLES
  const classes = mergeStyleSets({
    title: {
      marginBottom: 20,
      display: "block",
    },
    subtitle: {
      margin: "30px 0 5px 0",
      display: "block",
    },
  });

  const linkStyles: ILinkStyles = {
    root: {
      fontSize: FontSizes.smallPlus,
    },
  };

  const formRender = (form: IForm) => {
    return <Text variant="medium">{t_forms(`${form.name}.header`)}</Text>;
  };

  const CheckboxRender = (form: IForm) => {
    const [checked, { toggle: toggleChecked }] = useBoolean(!form.public);

    const handleOnChange = React.useCallback(
      (
        ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
        checked?: boolean
      ): void => {
        toggleChecked();
        const newForms = forms.map((f) => {
          return f.key === form.key
            ? ({
                ...f,
                public: !checked,
              } as IForm)
            : form;
        });
        setForms(newForms);
      },
      [toggleChecked, form]
    );

    return (
      <Checkbox
        checked={checked}
        onChange={handleOnChange}
        disabled={privateProject}
      />
    );
  };

  return (
    <React.Fragment>
      <Text variant="xLarge" className={classes.title}>
        {t("header")}
      </Text>

      {/* Welcome */}
      <Text variant="large" className={classes.subtitle}>
        {t("welcome-subtitle")}
      </Text>
      <Text variant="medium" block>
        {t("welcome-description")}
      </Text>
      <Link href="" styles={linkStyles}>
        {t("commitment-to-privacy-link")}
      </Link>

      {/* Set Privacy */}
      <Text variant="large" className={classes.subtitle}>
        {t("management-subtitle")}
      </Text>
      <Text variant="medium" block>
        {t("management-description")}
      </Text>

      <br />
      <Toggle
        label={t("toggle-label")}
        inlineLabel
        defaultChecked
        onText={t_basics("private")}
        offText={t_basics("public")}
        onChange={handleChangePrivacy}
      />
      <DetailsList
        items={forms}
        columns={columns}
        selectionMode={SelectionMode.none}
      />
    </React.Fragment>
  );
}
