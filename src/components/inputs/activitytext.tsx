import React, { useState } from 'react'
import { Link } from '@fluentui/react/lib/Link';
import {
    DetailsList,
    IGroup,
    IDetailsListProps,
    SelectionMode,
    useTheme,
    IDetailsRowStyles,
    DetailsRow,
    IColumn,
    TooltipHost,
    FontSizes,
    IStyle,
    IRawStyle,
    TextField,
    ITextFieldProps,
    IPalette,
    IDetailsGroupRenderProps,
    Text,
    Stack,
    IconButton,
    IGroupDividerProps,
    IButtonStyles
} from '@fluentui/react';

import ActivitiesMatrixGraph, { ActivityVertex } from 'models/canadian/actvitiesmatrix';
import { LogicmodelVertex } from 'models/canadian/logicmodel';
import { NodeInfo } from 'pages/methodologies/canadian/projectforms/activitiesform';
import { useTranslation } from 'react-i18next';

type ActivityMatrixTextFieldInputProps = {
    rowItems: NodeInfo[];
    groups?: IGroup[];
    handleAddActivity: (outputId: string, itemId: string) => void;
    handleDeleteActivity: (outputId: string, itemId: string) => void;
}

function generateGroupId(id: string) {
    return `group${id}`;
}

export default function ActivityMatrixTextFieldInput(props: ActivityMatrixTextFieldInputProps) {

    // STYLES
    const { palette } = useTheme();

    // LOGIC
    const { rowItems, groups, handleAddActivity, handleDeleteActivity } = props;
    const { t } = useTranslation();

    const [items, setItems] = useState(rowItems);

    const columns: IColumn[] = [
        {
            key: 'column1',
            name: 'Field',
            styles: { root: { textAlign: "right", fontSize: 40 } },
            ariaLabel: 'Outcomes, Outputs and Activities',
            fieldName: 'field',
            minWidth: 10,
            maxWidth: 150,
            data: 'string',
            onRender: (item: NodeInfo) => fieldRender(item)
        },
        {
            key: 'column2',
            name: 'Code',
            fieldName: 'code',
            ariaLabel: "Code",
            minWidth: 0,
            maxWidth: 350,
            isRowHeader: true,
            data: 'number',
            onRender: (item: NodeInfo) => codeRender(item),
        },
        {
            key: 'column3',
            name: 'Description',
            fieldName: 'description',
            minWidth: 70,
            data: 'string',
            isResizable: true,
            isPadded: true,
            isMultiline: true,
            // isFiltered: true,
            onRender: (item: NodeInfo) => descriptionRender(item, palette),
        },
        {
            key: 'column4',
            name: '',
            fieldName: 'operators',
            minWidth: 70,
            data: 'string',
            isResizable: true,
            isPadded: true,
            // isFiltered: true,
            onRender: (item: NodeInfo) => operatorsRender(item, palette, t, handleAddActivity, handleDeleteActivity),
        },
    ]

    const onRenderRow: IDetailsListProps['onRenderRow'] = props => {
        const customStyles: Partial<IDetailsRowStyles> = {};

        if (props) {
            const { item } = props;
            switch (item.level) {
                case 0:
                    customStyles.root = {
                        backgroundColor: palette.themeLighter,
                        fontSize: FontSizes.medium,
                        ":hover": {
                            backgroundColor: palette.themeLighter,
                        }
                    }
                    break;
                case 1:
                    customStyles.root = {
                        backgroundColor: palette.themeLighterAlt,
                        ":hover": {
                            backgroundColor: palette.themeLighterAlt,
                        }
                    }
                    break;
                case 2:
                    customStyles.root = {
                        ":hover": {
                            backgroundColor: palette.white,
                        }
                    }
                    break;
            }

            return <DetailsRow {...props} styles={customStyles} />;
        }
        return null;
    };

    const onToggleCollapseRow = (props: IGroupDividerProps) => {
        return () => {
            props!.onToggleCollapse!(props!.group!);
        };
    }

    return (
        <DetailsList
            items={items}
            columns={columns}
            groups={groups}
            onRenderRow={onRenderRow}
            selectionMode={SelectionMode.none}
            isHeaderVisible={false}
        />
    )
}

const fieldRender = (item: NodeInfo) => {

    const variant = item.level === 0 ? "medium" : "small";
    return (
        <div style={{ textAlign: "end", color: "black" }}>
            <Text variant={variant}><b>{item.name}</b></Text>
        </div>
    )
}

const codeRender = (item: NodeInfo) => {
    return item.id
}

const descriptionRender = (item: NodeInfo, palette: IPalette) => {

    const textFieldProps: ITextFieldProps = {
        rows: 1,
        multiline: true,
        resizable: false,
        defaultValue: item.description,
        styles: {
            root: {
                minWidth: 200,
            },
            fieldGroup: {
                borderRadius: "0 0 2px 2px",
                border: `1px solid ${palette.neutralLighter}`,
                selectors: {
                    ":hover": {
                        border: `1px solid ${palette.neutralTertiary}`,

                    },
                },
            },
        },
    }

    let html;
    switch (item.level) {
        case 2:
            html = <TextField {...textFieldProps}>
                {item.description}
            </TextField>
            break;
        default:
            html = <span>{item.description}</span>
            break;
    }

    return html
}

const operatorsRender = (item: NodeInfo, palette: IPalette, t: Function, handleAdd: Function, handleDelete: Function) => {
    const commandStyles: Partial<IButtonStyles> = {
        root: {
            height: 25,
        },
        rootHovered: {
            backgroundColor: palette.neutralLighter,
        },
        icon: {
            fontSize: 13,
            color: palette.black,
        },
    };

    return (item.level === 2 ?
        <React.Fragment>
            <TooltipHost content={t("tooltip-delete")}>
                <IconButton
                    iconProps={{ iconName: "Add" }}
                    styles={commandStyles}
                    onClick={() => handleAdd(item.id)}
                />
            </TooltipHost>
            <TooltipHost content={t("tooltip-delete")}>
                <IconButton
                    iconProps={{ iconName: "Cancel" }}
                    styles={commandStyles}
                    onClick={() => handleDelete(item.id)}
                />
            </TooltipHost>
        </React.Fragment> : null
    )
}