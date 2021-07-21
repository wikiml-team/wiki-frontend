import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { string, object } from "yup";
import { ObjectShape } from "yup/lib/object";
import { Formik, Form, Field } from "formik";
import { useId } from '@fluentui/react-hooks';
import {
  IconButton,
  Stack,
  Text,
  IStackProps,
  ITextFieldProps,
  TooltipHost,
} from "@fluentui/react";

import LogicTextFieldInput from "components/inputs/logictext";
import { logicmodelGraphExample } from "models/logicmodel";
import TextFieldInput from "components/inputs/text";

type formValuesType = {
  [key: string]: string;
}

export default function LogicModelForm() {
  // LOGIC
  const [graph, setGraph] = useState(logicmodelGraphExample)
  const [treeToRender, setTreeToRender] = useState(graph.buildTree())

  const handleAddNode = (id: string) => {
    setGraph(graph.addNode(id));
    setTreeToRender(graph.buildTree());
  }

  const handleDeleteNode = (id: string) => {
    setGraph(graph.deleteNode(id));
    setTreeToRender(graph.buildTree());
  }

  // FORMIK
  var shape: ObjectShape = { "verionMode": string() };
  for (let v of graph.vertex) {
    shape[`textFiled${v.id}`] = string();
  }

  var initialValues: formValuesType = { "verionMode": "" }; // Take init value from DB
  for (let v of graph.vertex) {
    initialValues[`textFiled${v.id}`] = v.text;
  }

  const validationSchema = object().shape(shape);

  // STYLES
  const outcomeStackProps: Partial<IStackProps> = {
    // horizontal: true,
    tokens: { childrenGap: 10 },
    styles: {
      root: {
        width: "100%"
      }
    }
  };

  return <Formik
    initialValues={initialValues!}
    validationSchema={validationSchema}
    onSubmit={(values) => alert(values)}
  >
    <Form>
      <VersionFieldInput />

      <Stack horizontal tokens={{ childrenGap: 20 }}>
        {/* Labels */}
        <Stack.Item>
          <LagicmodelLabels />
        </Stack.Item>

        {/* Inputs */}
        <Stack.Item style={{ width: "100%" }}>
          <Stack {...outcomeStackProps}>
            <LogicTextFieldInput
              nodeTree={treeToRender}
              handleAddChild={handleAddNode}
              handleDelete={handleDeleteNode}
            />
          </Stack>
        </Stack.Item>
      </Stack>
    </Form>
  </Formik>
}

function LagicmodelLabels() {

  // LOGIC
  const { t } = useTranslation("logicmodel-form");

  // STYLES
  const labelStackProps: Partial<IStackProps> = {
    verticalAlign: "space-between",
    styles: {
      root: {
        width: 120,
        height: "100%",
        maxHeight: 530,
        padding: "20px 0 30px 0",
      },
    },
  };

  return <Stack {...labelStackProps}>
    <Stack.Item>
      <Text variant="mediumPlus">
        <b>{t("ultimate-outcome")}</b>
      </Text>
    </Stack.Item>
    <Stack.Item>
      <Text variant="mediumPlus">
        <b>{t("intermediat-outcome")}</b>
      </Text>
    </Stack.Item>
    <Stack.Item>
      <Text variant="mediumPlus">
        <b>{t("inmediate-outcome")}</b>
      </Text>
    </Stack.Item>
    <Stack.Item>
      <Text variant="mediumPlus">
        <b>{t("outputs")}</b>
      </Text>
    </Stack.Item>
  </Stack>
}

// EditVersionInputTextField
type InputInfo = {
  tooltip: string,
  icon: string,
  arialabel: string,
}

export function VersionFieldInput() {

  // LOGIC
  const { t } = useTranslation("logicmodel-form");

  const [editionMode, setEditionMode] = useState(false);
  const [inputInfo, setInputInfo] = useState({ tooltip: "Edit version", icon: "EditSolid12", arialabel: "Edit" } as InputInfo);

  const toogleVersionEdition = () => {

    if (editionMode) {
      setInputInfo({ tooltip: "Edit version", icon: "EditSolid12", arialabel: "Edit" } as InputInfo)
    } else {
      setInputInfo({ tooltip: "Save version", icon: "SkypeCheck", arialabel: "Submit" } as InputInfo)
    }

    setEditionMode(val => !val);
  }

  // STYLES
  const tooltipId = useId('tooltip');

  const infoStakProps: Partial<IStackProps> = {
    horizontal: true,
    horizontalAlign: "end",
    styles: {
      root: {
        marginBottom: 30,
      },
    },
  };

  const versionTextFieldProps: Partial<ITextFieldProps> = {
    styles: {
      fieldGroup: {
        borderRadius: 4,
        selectors: {
          "::after": {
            borderRadius: "inherit",
            border: "2px solid #003a66",
          },
        },
      },
    },
  };

  return <Stack {...infoStakProps}>
    <Field
      label={t("versio-label")}
      name="verionMode"
      underlined
      readOnly={!editionMode}
      placeholder={t("version-placeholder")}
      component={TextFieldInput}
      {...versionTextFieldProps}
    />
    <TooltipHost
      content={inputInfo.tooltip}
      id={tooltipId}
    >
      <IconButton iconProps={{ iconName: inputInfo.icon }}
        title={inputInfo.arialabel}
        ariaLabel={inputInfo.arialabel}
        onClick={() => toogleVersionEdition()}

      />
    </TooltipHost>
  </Stack>
}