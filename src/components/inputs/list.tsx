import React from 'react'
import { useTranslation } from 'react-i18next';
import {
    DetailsList,
    IGroup,
    IDetailsListProps,
    SelectionMode,
    IColumn,
    IGroupDividerProps,
} from '@fluentui/react';

import { NodeInfo } from 'models/canadian/actvitiesmatrix';

type ListFieldInputFieldInputProps = {
    rowItems: NodeInfo[];
    groups?: IGroup[];
    columns: IColumn[];
    onRenderRow: IDetailsListProps['onRenderRow']
}

export default function ListFieldInput(props: ListFieldInputFieldInputProps) {

    // LOGIC
    const { rowItems, groups, columns, onRenderRow } = props;

    // Collapse behaviour
    const onToggleCollapseRow = (props: IGroupDividerProps) => {
        return () => {
            props!.onToggleCollapse!(props!.group!);
        };
    }

    return (
        <DetailsList
            items={rowItems}
            columns={columns}
            groups={groups}
            onRenderRow={onRenderRow}
            selectionMode={SelectionMode.none}
            isHeaderVisible={false}
        />
    )
}



