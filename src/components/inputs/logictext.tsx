import React from 'react'
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

import TextFieldInput from "components/inputs/text";
import { LogicmodelVertex, LogicmodelTree } from "models/logicmodel";

type LogicTextFieldInputProps = {
    vertex: LogicmodelVertex,
    canDelete?: boolean,
    canAdd?: boolean,
    handleAddChild: (id: string) => void,
    handleDelete: (id: string) => void,
    children?: LogicmodelTree[],
}

export default function LogicTextFieldInput(props: LogicTextFieldInputProps) {

    // LOGIC
    const {
        vertex,
        canDelete,
        canAdd,
        handleAddChild,
        handleDelete,
        children,
    } = props;

    // STYLES
    const { palette } = useTheme();

    const rootStackItemProps: Partial<IStackItemProps> = {
        grow: 1,
        styles: {
            root: {
                textAlign: "center",
            },
        },
    };

    const childrenStackProps: Partial<IStackProps> = {
        horizontal: true,
        horizontalAlign: "space-between",
        tokens: { childrenGap: 20 }
    };

    const inputTextFieldProps: Partial<ITextFieldProps> = {
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

    const arrowProps: Partial<IIconProps> = {
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
                {vertex.level > 0 && <Icon {...arrowProps} />}
                <LogicTextFieldHeader vertex={vertex}
                    canAdd={canAdd}
                    handleAddChild={handleAddChild}
                    canDelete={canDelete}
                    handleDelete={handleDelete} />
                <Field
                    name={`textFiled${vertex.id}`}
                    component={TextFieldInput}
                    {...inputTextFieldProps}
                />
            </Stack.Item>

            <Stack.Item {...rootStackItemProps}>
                <Stack {...childrenStackProps} >
                    {children && children.map(child =>
                        <Stack.Item key={child.node.id} grow>
                            <LogicTextFieldInput
                                vertex={child.node}
                                canDelete={child.children.length === 0}
                                canAdd={child.node.level < 3 && child.children.length < 4}
                                handleAddChild={handleAddChild}
                                handleDelete={handleDelete}
                                children={child.children}
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
    const { t } = useTranslation("logicmodel-form");

    const { vertex, canAdd, handleAddChild, canDelete, handleDelete } = props;
    const { id, level } = vertex;

    // STYLES

    const { palette } = useTheme();

    const titleStyles: Partial<ITextStyles> = {
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
            <Text variant="medium">{id}</Text>
        </Stack.Item>
        <Stack.Item>
            {canAdd && (
                <TooltipHost content={level !== 2 ? t("tooltip-addOutcome") : t("tooltip-addOutput")}>
                    <IconButton
                        iconProps={{ iconName: "Add" }}
                        styles={commandStyles}
                        onClick={() => handleAddChild(id)}
                    />
                </TooltipHost>
            )}
            {canDelete && (
                <TooltipHost content={t("tooltip-delete")}>
                    <IconButton
                        iconProps={{ iconName: "Cancel" }}
                        styles={commandStyles}
                        onClick={() => handleDelete(id)}
                    />
                </TooltipHost>
            )}
        </Stack.Item>
    </Stack>
}

