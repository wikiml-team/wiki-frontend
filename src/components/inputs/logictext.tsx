import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Field } from "formik";
import {
    Stack,
    IStackItemProps,
    IStackProps,
    IButtonStyles,
    Icon,
    IIconProps,
    ITextStyles,
    Text,
    TooltipHost,
    IconButton,
    useTheme,
    ITextFieldProps,
} from '@fluentui/react';

import { selectWorkplaceConfig, setConfiguration } from "store/slices/workplaceslice";
import { Tree } from "models/tree";
import { LogicmodelVertex } from "models/logicmodel";
import TextFieldInput from "components/inputs/text";

type LogicTextFieldInputProps = {
    nodeTree: Tree<LogicmodelVertex>,
    handleAddChild: (id: string) => void,
    handleDelete: (id: string) => void,
}

export default function LogicTextFieldInput(props: LogicTextFieldInputProps) {

    // LOGIC
    const {
        nodeTree,
        handleAddChild,
        handleDelete,
    } = props;
    const { node, children } = nodeTree;

    // STYLES
    const { palette } = useTheme();

    const rootStackItemProps: IStackItemProps = {
        grow: 1,
        styles: {
            root: {
                textAlign: "center",
            },
        },
    };

    const childrenStackProps: IStackProps = {
        horizontal: true,
        horizontalAlign: "space-between",
        tokens: { childrenGap: 20 }
    };

    const inputTextFieldProps: ITextFieldProps = {
        multiline: true,
        rows: 3,
        resizable: false,
        styles: {
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
                margin: "10px auto",
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
                    handleDelete={handleDelete} />
                <Field
                    name={`textFiled${node.id}`}
                    component={TextFieldInput}
                    {...inputTextFieldProps}
                />
            </Stack.Item>

            <Stack.Item {...rootStackItemProps}>
                <Stack {...childrenStackProps} >
                    {children && children.map(child =>
                        <Stack.Item key={child.node.id} grow>
                            <LogicTextFieldInput
                                nodeTree={child}
                                handleAddChild={handleAddChild}
                                handleDelete={handleDelete}
                            />
                        </Stack.Item>
                    )}
                </Stack>
            </Stack.Item>
        </React.Fragment>
    )
}

function LogicTextFieldHeader(props: LogicTextFieldInputProps) {

    // LOGIC
    const { nodeTree, handleAddChild, handleDelete } = props;
    const { node, children } = nodeTree;

    const canAdd = node.level < 3 && children.length < 4;
    const canDelete = children.length === 0;
    const canRedirectOutput = node.level === 3;

    const { t } = useTranslation("logicmodel-form");
    const dispatch = useDispatch();
    const { tabsSchema, latestMenuTab, configuration } = useSelector(selectWorkplaceConfig);

    const handleRedirectToActivity = (id: string) => {
        const formtabKey = tabsSchema.findChildByName("activitiesmatrix").key;
        const renderPage = tabsSchema.findChildByKey(latestMenuTab, formtabKey).render;
        dispatch(setConfiguration({ key: latestMenuTab, tab: formtabKey, page: renderPage }));

    }

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

    return <Stack
        horizontal
        styles={titleStyles}
        horizontalAlign="space-between"
    >
        <Stack.Item>
            <Text variant="medium">{node.id}</Text>
        </Stack.Item>
        <Stack.Item>
            {canRedirectOutput &&
                <TooltipHost content={t("tooltip-redirectToAct")}>
                    <IconButton
                        iconProps={{ iconName: "MultiSelect" }}
                        styles={commandStyles}
                        onClick={() => handleRedirectToActivity(node.id)}
                    />
                </TooltipHost>
            }
            {canAdd &&
                <TooltipHost content={node.level !== 2 ? t("tooltip-addOutcome") : t("tooltip-addOutput")}>
                    <IconButton
                        iconProps={{ iconName: "Add" }}
                        styles={commandStyles}
                        onClick={() => handleAddChild(node.id)}
                    />
                </TooltipHost>
            }
            {canDelete &&
                <TooltipHost content={t("tooltip-delete")}>
                    <IconButton
                        iconProps={{ iconName: "Cancel" }}
                        styles={commandStyles}
                        onClick={() => handleDelete(node.id)}
                    />
                </TooltipHost>
            }
        </Stack.Item>
    </Stack>
}

