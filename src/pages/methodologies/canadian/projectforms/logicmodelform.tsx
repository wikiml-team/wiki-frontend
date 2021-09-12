import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { string, object } from "yup";
import { ObjectShape } from "yup/lib/object";
import { Formik, Form } from "formik";
import {
  Stack,
  Text,
  IStackProps,
  ITextStyles,
  PrimaryButton,
  DefaultButton,
  Panel,
  TooltipHost,
} from "@fluentui/react";
import { useBoolean } from '@fluentui/react-hooks';

import LogicTextFieldInput from "components/inputs/logictext";
import LogicmodelGraph from "models/canadian/logicmodel";
import { selectProject } from "store/slices/projectslice";
import { LogicModelOutcomeFormPanel, LogicModelOutputFormPanel } from "components/sidepanel/formcontents"
import ContextualHelpContent from "components/help/contextualhelp"

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

  // Panels
  const [outputPanelIsOpen, { setTrue: openOutputPanel, setFalse: dismissOutputPanel }] = useBoolean(false);
  const [outcomePanelIsOpen, { setTrue: openOutcomePanel, setFalse: dismissOutcomePanel }] = useBoolean(false);
  const [outcomeHelpPanelIsOpen, { setTrue: openOutcomeHelpPanel, setFalse: dismissOutcomeHelpPanel }] = useBoolean(false);
  const [outputHelpPanelIsOpen, { setTrue: openOutputHelpPanel, setFalse: dismissOutputHelpPanel }] = useBoolean(false);

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

  return <React.Fragment>
    <Formik
      initialValues={initialValues!}
      validationSchema={validationSchema}
      onSubmit={(values) => alert(values)}
    >
      <Form>
        <Stack horizontal tokens={{ childrenGap: 20 }}>
          {/* Labels */}
          <Stack.Item>
            <LogicmodelLabels />
          </Stack.Item>

          {/* Inputs */}
          <Stack.Item style={{ width: "100%" }}>
            <Stack tokens={{ childrenGap: 10 }} >
              <LogicTextFieldInput
                nodeTree={treeToRender}
                handleAddChild={handleAddNode}
                handleDelete={handleDeleteNode}
                hanldeOpenOutputPanel={openOutputPanel}
                hanldeOpenOutcomePanel={openOutcomePanel}
                handleOutcomeHelpPanel={openOutcomeHelpPanel}
                handleOutputHelpPanel={openOutputHelpPanel}
              />
            </Stack>
          </Stack.Item>
        </Stack>
      </Form>
    </Formik>

    <PanelsRender
      outcomePanelIsOpen={outcomePanelIsOpen}
      dismissOutcomePanel={dismissOutcomePanel}
      outputPanelIsOpen={outputPanelIsOpen}
      dismissOutputPanel={dismissOutputPanel}
      outcomeHelpPanelIsOpen={outcomeHelpPanelIsOpen}
      dismissOutcomeHelpPanel={dismissOutcomeHelpPanel}
      outputHelpPanelIsOpen={outputHelpPanelIsOpen}
      dismissOutputHelpPanel={dismissOutputHelpPanel}
    />
  </React.Fragment>
}

type PanelsRenderPros = {
  outcomePanelIsOpen: boolean,
  dismissOutcomePanel: () => void,
  outputPanelIsOpen: boolean,
  dismissOutputPanel: () => void,
  outcomeHelpPanelIsOpen: boolean,
  dismissOutcomeHelpPanel: () => void,
  outputHelpPanelIsOpen: boolean,
  dismissOutputHelpPanel: () => void,
}

function PanelsRender(props: PanelsRenderPros) {

  // LOGIC
  const { outcomePanelIsOpen,
    dismissOutcomePanel,
    outputPanelIsOpen,
    dismissOutputPanel,
    outcomeHelpPanelIsOpen,
    dismissOutcomeHelpPanel,
    outputHelpPanelIsOpen,
    dismissOutputHelpPanel,
  } = props;
  const { t } = useTranslation(["logicmodel-activitymatrix-form", "contextual-help"]);


  const handleDismissPanel = () => {
    dismissOutputPanel();
    dismissOutcomePanel();
  }

  // RENDER
  const onRenderFooterContent = React.useCallback(
    () => (
      <div>
        <TooltipHost content={t("tooltip-panel-concat")}>
          <PrimaryButton onClick={handleDismissPanel} styles={{ root: { marginRight: 8 } }}>
            {t("concat-button-label")}
          </PrimaryButton>
        </TooltipHost>
        <TooltipHost content={t("tooltip-panel-save")}>
          <DefaultButton onClick={handleDismissPanel} styles={{ root: { marginRight: 8 } }}>
            {t("sidepanel:save")}
          </DefaultButton>
        </TooltipHost>
      </div>
    ),
    [handleDismissPanel],
  );

  return <React.Fragment>
    {/* Outcome Panel */}
    <Panel
      isOpen={outcomePanelIsOpen}
      closeButtonAriaLabel="Close"
      isHiddenOnDismiss={true}
      headerText={t("outcome-panel-header")}
      onDismiss={dismissOutcomePanel}
      isFooterAtBottom={true}
      onRenderFooterContent={onRenderFooterContent}
    >
      <LogicModelOutcomeFormPanel />
    </Panel>

    {/* Output Panel */}
    <Panel
      isOpen={outputPanelIsOpen}
      closeButtonAriaLabel="Close"
      isHiddenOnDismiss={true}
      headerText={t("output-panel-header")}
      onDismiss={dismissOutputPanel}
      isFooterAtBottom={true}
      onRenderFooterContent={onRenderFooterContent}
    >
      <LogicModelOutputFormPanel />
    </Panel>

    {/* Outcome Help Panel */}
    <Panel
      isOpen={outcomeHelpPanelIsOpen}
      closeButtonAriaLabel="Close"
      isHiddenOnDismiss={true}
      headerText={t("contextual-help:help-panel-header")}
      onDismiss={dismissOutcomeHelpPanel}
      isFooterAtBottom={true}
    >
      <ContextualHelpContent
        definition="Lorem ipsum dolre mas seit cause frieto mei suilka fraterni de su vormetto. Cosi se me face le buc torbellini de sua me. "
        example="Lorem ipsum dolre mas seit cause frieto mei suilka fraterni de su vormetto. Cosi se me face le buc torbellini de sua me. "
        format="Lorem ipsum dolre mas seit cause frieto mei suilka fraterni de su vormetto. Cosi se me face le buc torbellini de sua me. "
        guide="Lorem ipsum dolre mas seit cause frieto mei suilka fraterni de su vormetto. Cosi se me face le buc torbellini de sua me. "
        tips="Lorem ipsum dolre mas seit cause frieto mei suilka fraterni de su vormetto. Cosi se me face le buc torbellini de sua me. " />
    </Panel>

    {/* Output Help Panel */}
    <Panel
      isOpen={outputHelpPanelIsOpen}
      closeButtonAriaLabel="Close"
      isHiddenOnDismiss={true}
      headerText={t("contextual-help:help-panel-header")}
      onDismiss={dismissOutputHelpPanel}
      isFooterAtBottom={true}
    >
      <ContextualHelpContent
        definition="Lorem ipsum dolre mas seit cause frieto mei suilka fraterni de su vormetto. Cosi se me face le buc torbellini de sua me. "
        example="Lorem ipsum dolre mas seit cause frieto mei suilka fraterni de su vormetto. Cosi se me face le buc torbellini de sua me. "
        format="Lorem ipsum dolre mas seit cause frieto mei suilka fraterni de su vormetto. Cosi se me face le buc torbellini de sua me. "
        guide="Lorem ipsum dolre mas seit cause frieto mei suilka fraterni de su vormetto. Cosi se me face le buc torbellini de sua me. "
        tips="Lorem ipsum dolre mas seit cause frieto mei suilka fraterni de su vormetto. Cosi se me face le buc torbellini de sua me. " />
    </Panel>
  </React.Fragment >
}

function LogicmodelLabels() {

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

  const TextMediumPlus = (props: { label: string }) => {
    return <Stack.Item>
      <Text variant="mediumPlus" styles={textStyles}>
        {t(props.label)}
      </Text>
    </Stack.Item>
  }

  return <Stack {...labelStackProps}>
    <TextMediumPlus label="ultimate-outcomes" />
    <TextMediumPlus label="intermediate-outcomes" />
    <TextMediumPlus label="intermediate-outcomes" />
    <TextMediumPlus label="outputs" />
  </Stack>
}
