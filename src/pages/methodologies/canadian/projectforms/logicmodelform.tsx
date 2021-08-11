import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { string, object } from "yup";
import { ObjectShape } from "yup/lib/object";
import { Formik, Form } from "formik";
import {
  Stack,
  Text,
  IStackProps,
  ITextStyles,
} from "@fluentui/react";

import LogicTextFieldInput from "components/inputs/logictext";
import LogicmodelGraph from "models/canadian/logicmodel";
import { selectProject } from "store/slices/projectslice";
import { useSelector } from "react-redux";

type formValuesType = {
  [key: string]: string;
}

export default function LogicModelForm() {

  // LOGIC
  const project = useSelector(selectProject);
  const currentForm = project.forms.find(form => form.name === "logicModelActivities")!;
  const logicModelGraph = currentForm.structure as LogicmodelGraph;

  const [graph, setGraph] = useState(logicModelGraph)
  const [treeToRender, setTreeToRender] = useState(graph.buildTree())

  const handleAddNode = (siblingId: string) => {
    setGraph(graph.addNode(siblingId));
    setTreeToRender(graph.buildTree());
  }

  const handleDeleteNode = (id: string) => {
    setGraph(graph.deleteNode(id));
    setTreeToRender(graph.buildTree());
  }

  // FORMIK
  var initialValues: formValuesType = { "verionMode": "" }; // Take init value from DB
  for (let v of graph.vertex) {
    initialValues[`textFiled${v.id}`] = v.text;
  }

  var shape: ObjectShape = { "verionMode": string() };
  for (let v of graph.vertex) {
    shape[`textFiled${v.id}`] = string();
  }

  const validationSchema = object().shape(shape);

  return <Formik
    initialValues={initialValues!}
    validationSchema={validationSchema}
    onSubmit={(values) => alert(values)}
  >
    <Form>
      <Stack horizontal tokens={{ childrenGap: 20 }}>
        {/* Labels */}
        <Stack.Item>
          <LagicmodelLabels />
        </Stack.Item>

        {/* Inputs */}
        <Stack.Item style={{ width: "100%" }}>
          <Stack tokens={{ childrenGap: 10 }} >
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
  const { t } = useTranslation("logicmodel-activitymatrix-form");

  // STYLES
  const labelStackProps: IStackProps = {
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

  const textStyles: ITextStyles = {
    root: {
      fontWeight: 600
    }
  }

  const TextMediumPlus = (label: string) => {
    return <Stack.Item>
      <Text variant="mediumPlus" styles={textStyles}>
        {t(label)}
      </Text>
    </Stack.Item>
  }

  return <Stack {...labelStackProps}>
    {TextMediumPlus("ultimate-outcomes")}
    {TextMediumPlus("intermediate-outcomes")}
    {TextMediumPlus("inmediate-outcomes")}
    {TextMediumPlus("outputs")}
  </Stack>
}
