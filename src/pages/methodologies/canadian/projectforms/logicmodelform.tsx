import React, { useState } from "react";
import {
  Stack,
  TextField,
  ITextFieldProps,
  Text,
  IStackProps,
  IconButton,
  TooltipHost,
} from "@fluentui/react";

import LogicTextFieldInput, { VersionFieldInput } from "components/inputs/logictext";
import { logicmodelGraphExample } from "models/logicmodel";
import { useTranslation } from "react-i18next";

export default function LogicModelForm() {

  // LOGIC
  const [graph, setGraph] = useState(logicmodelGraphExample)
  const [treeToRender, setTreeToRender] = useState(graph.buildTree())


  const handleAddNode = (id: string) => {
    setGraph(graph.addNode(id));
    setTreeToRender(graph.buildTree());
  }

  const handleRemoveNode = (id: string) => {
    setGraph(graph.removeNode(id));
    setTreeToRender(graph.buildTree());
  }

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

  return <React.Fragment>

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
            vertex={treeToRender.node}
            canDelete={false}
            canAdd={true}
            handleAddChild={handleAddNode}
            handleDelete={handleRemoveNode}
            children={treeToRender.children}
          />
        </Stack>
      </Stack.Item>
    </Stack>
  </React.Fragment>
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
        <b>{t("ultimateOutcome")}</b>
      </Text>
    </Stack.Item>
    <Stack.Item>
      <Text variant="mediumPlus">
        <b>{t("intermediateOutcome")}</b>
      </Text>
    </Stack.Item>
    <Stack.Item>
      <Text variant="mediumPlus">
        <b>{t("inmediateOutcome")}</b>
      </Text>
    </Stack.Item>
    <Stack.Item>
      <Text variant="mediumPlus">
        <b>{t("outputs")}</b>
      </Text>
    </Stack.Item>
  </Stack>
}