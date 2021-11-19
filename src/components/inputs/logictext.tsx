import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Field } from "formik";

import {
  IButtonStyles,
  Icon,
  IconButton,
  IIconProps,
  IStackItemProps,
  IStackProps,
  ITextFieldProps,
  ITextStyles,
  Stack,
  Text,
  TooltipHost,
  useTheme,
} from "@fluentui/react";

import {
  selectWorkplaceConfig,
  setConfiguration,
} from "store/slices/workplaceslice";
import { Tree } from "models/graph";
import { LogicmodelVertex } from "models/canadian/logicmodel";
import TextFieldInput from "components/inputs/text";

type LogicTextFieldInputProps = {
  nodeTree: Tree<LogicmodelVertex>;
  handleAddChild: (id: string) => void;
  handleDelete: (id: string) => void;
  hanldeOpenOutputPanel: () => void;
  hanldeOpenOutcomePanel: () => void;
  handleOutcomeHelpPanel: () => void;
  handleOutputHelpPanel: () => void;
};

export default function LogicTextFieldInput(props: LogicTextFieldInputProps) {
  const {
    nodeTree,
    handleAddChild,
    handleDelete,
    hanldeOpenOutputPanel,
    hanldeOpenOutcomePanel,
    handleOutcomeHelpPanel,
    handleOutputHelpPanel,
  } = props;
  const { node, children } = nodeTree;

  // STYLES
  const { palette } = useTheme();

  const rootStackItemProps: IStackItemProps = {
    grow: 1,
    styles: {
      root: {
        textAlign: "center",
        marginTop: "0px !important",
      },
    },
  };

  const childrenStackProps: IStackProps = {
    horizontal: true,
    horizontalAlign: "space-between",
    tokens: { childrenGap: 20 },
  };

  const inputTextFieldProps: ITextFieldProps = {
    rows: 3,
    multiline: true,
    resizable: false,
    styles: {
      root: {
        minWidth: 200,
      },
      fieldGroup: {
        borderRadius: "0 0 2px 2px",
        border: `1px solid ${palette.neutralQuaternary}`,
        borderTop: `1px solid ${palette.neutralLighter}`,
        selectors: {
          ":hover": {
            border: `1px solid ${palette.neutralTertiary}`,
          },
        },
      },
    },
  };

  const arrowProps: IIconProps = {
    iconName: "SortUp",
    ariaLabel: "Belongs to",
    styles: {
      root: {
        margin: "8px auto",
      },
    },
  };

  return (
    <React.Fragment>
      <Stack.Item {...rootStackItemProps}>
        {node.level > 0 && <Icon {...arrowProps} />}
        <LogicTextFieldHeader
          nodeTree={nodeTree}
          handleAddChild={handleAddChild}
          handleDelete={handleDelete}
          hanldeOpenOutputPanel={hanldeOpenOutputPanel}
          hanldeOpenOutcomePanel={hanldeOpenOutcomePanel}
          handleOutcomeHelpPanel={handleOutcomeHelpPanel}
          handleOutputHelpPanel={handleOutputHelpPanel}
        />
        <Field
          name={`textFiled${node.id}`}
          component={TextFieldInput}
          {...inputTextFieldProps}
        />
      </Stack.Item>

      <Stack.Item {...rootStackItemProps}>
        <Stack {...childrenStackProps}>
          {children &&
            children.map((child) => (
              <Stack.Item key={child.node.id} grow>
                <LogicTextFieldInput
                  nodeTree={child}
                  handleAddChild={handleAddChild}
                  handleDelete={handleDelete}
                  hanldeOpenOutputPanel={hanldeOpenOutputPanel}
                  hanldeOpenOutcomePanel={hanldeOpenOutcomePanel}
                  handleOutcomeHelpPanel={handleOutcomeHelpPanel}
                  handleOutputHelpPanel={handleOutputHelpPanel}
                />
              </Stack.Item>
            ))}
        </Stack>
      </Stack.Item>
    </React.Fragment>
  );
}

function LogicTextFieldHeader(props: LogicTextFieldInputProps) {
  const {
    nodeTree,
    handleAddChild,
    handleDelete,
    hanldeOpenOutputPanel,
    hanldeOpenOutcomePanel,
    handleOutcomeHelpPanel,
    handleOutputHelpPanel,
  } = props;
  const { node, children } = nodeTree;

  // LOGIC
  const { t } = useTranslation("forms", { keyPrefix: "logicmodel" });
  const { tabsSchema, latestMenuTab } = useSelector(selectWorkplaceConfig);

  const dispatch = useDispatch();

  // tooltips and buttons
  const tooltipContent =
    node.level === 0
      ? "tooltip.add-inmediate-outcome"
      : node.level === 1
      ? "tooltip.add-intermediate-outcome"
      : "tooltip.add-output";

  const canAdd = node.level !== 3;
  const canDelete = children.length === 0;
  const isAnOputut = node.level === 3;

  const handleRedirectToActivity = (id: string) => {
    const formtabKey = tabsSchema.findChildByName("activitiesmatrix").key;
    const renderPage = tabsSchema.findChildByKey(
      latestMenuTab,
      formtabKey
    ).render;
    dispatch(
      setConfiguration({
        key: latestMenuTab,
        tab: formtabKey,
        page: renderPage,
      })
    );
  };

  // STYLES
  const { palette } = useTheme();

  const titleStyles: ITextStyles = {
    root: {
      padding: 4,
      textAlign: "left",
      border: `1px solid ${palette.neutralQuaternary}`,
      borderBottom: "none",
      borderRadius: "2px 2px 0 0",
      backgroundColor: palette.neutralLighter,
    },
  };

  const commandStyles: Partial<IButtonStyles> = {
    root: {
      height: 25,
    },
    rootHovered: {
      backgroundColor: palette.neutralLight,
    },
    icon: {
      fontSize: 13,
      color: palette.black,
    },
  };

  return (
    <Stack horizontal styles={titleStyles} horizontalAlign="space-between">
      <Stack.Item>
        <Text variant="medium">{node.id}</Text>
      </Stack.Item>
      <Stack.Item>
        {isAnOputut ? (
          <>
            <TooltipHost content={t("tooltip.see-activities")}>
              <IconButton
                iconProps={{ iconName: "SnapToGrid" }}
                styles={commandStyles}
                onClick={() => handleRedirectToActivity(node.id)}
              />
            </TooltipHost>
            <TooltipHost content={t("tooltip.sintactic-struct")}>
              <IconButton
                iconProps={{ iconName: "ShowResults" }}
                styles={commandStyles}
                onClick={() => hanldeOpenOutputPanel()}
              />
            </TooltipHost>
            <TooltipHost content={t("tooltip.contextual-help")}>
              <IconButton
                iconProps={{ iconName: "Help" }}
                styles={commandStyles}
                onClick={() => handleOutputHelpPanel()}
              />
            </TooltipHost>
          </>
        ) : (
          <>
            <TooltipHost content={t("tooltip.sintactic-struct")}>
              <IconButton
                iconProps={{ iconName: "ShowResults" }}
                styles={commandStyles}
                onClick={() => hanldeOpenOutcomePanel()}
              />
            </TooltipHost>
            <TooltipHost content={t("tooltip.contextual-help")}>
              <IconButton
                iconProps={{ iconName: "Help" }}
                styles={commandStyles}
                onClick={() => handleOutcomeHelpPanel()}
              />
            </TooltipHost>
          </>
        )}
        {canAdd && (
          <TooltipHost content={t(tooltipContent)}>
            <IconButton
              iconProps={{ iconName: "Add" }}
              styles={commandStyles}
              onClick={() => handleAddChild(node.id)}
            />
          </TooltipHost>
        )}
        {canDelete && (
          <TooltipHost content={t("tooltip.delete")}>
            <IconButton
              iconProps={{ iconName: "Cancel" }}
              styles={commandStyles}
              onClick={() => handleDelete(node.id)}
            />
          </TooltipHost>
        )}
      </Stack.Item>
    </Stack>
  );
}
