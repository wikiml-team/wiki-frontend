import React, { useState } from "react";
import { useId } from '@fluentui/react-hooks';
import {
  Stack,
  TextField,
  ITextFieldProps,
  Text,
  IStackProps,
  IconButton,
  TooltipHost,
} from "@fluentui/react";

import LogicTextFieldInput from "components/inputs/logictext";
import { logicmodelGraphExample } from "models/logicmodel";

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

type InputInfo = {
  tooltip: string,
  icon: string,
  arialabel: string,
}

function VersionFieldInput() {

  // LOGIC
  const [editionMode, setEditionMode] = useState(false);
  const [inputInfo, setInputInfo] = useState({ tooltip: "Edit version", icon: "EditSolid12", arialabel: "Edit" } as InputInfo);

  const toogleVersionEdition = () => {

    console.log("editionMode: ", editionMode)

    if (editionMode) {
      setInputInfo({ tooltip: "Edit version", icon: "EditSolid12", arialabel: "Edit" } as InputInfo)
    } else {
      setInputInfo({ tooltip: "Save version", icon: "SkypeCheck", arialabel: "Submit" } as InputInfo)
    }
    console.log("inputInfo: ", inputInfo)

    setEditionMode(val => !val);
    console.log("inputInfo: ", editionMode)
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
    <TextField underlined label="Version:" {...versionTextFieldProps} readOnly={!editionMode} />
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

function LagicmodelLabels() {

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
        <b>Ultimate Outcome</b>
      </Text>
    </Stack.Item>
    <Stack.Item>
      <Text variant="mediumPlus">
        <b>Intermediate Outcome</b>
      </Text>
    </Stack.Item>
    <Stack.Item>
      <Text variant="mediumPlus">
        <b>Inmediate Outcome</b>
      </Text>
    </Stack.Item>
    <Stack.Item>
      <Text variant="mediumPlus">
        <b>Outputs</b>
      </Text>
    </Stack.Item>
  </Stack>
}