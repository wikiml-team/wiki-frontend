import React from 'react'
import {
    DetailsList,
    IGroup,
    IDetailsListProps,
    SelectionMode,
    IColumn,
    IGroupDividerProps,
} from '@fluentui/react';

import INodeInfo from 'models/nodeinfo';

type ListFieldInputFieldInputProps = {
    rowItems: INodeInfo[];
    groups?: IGroup[];
    columns: IColumn[];
    onRenderRow?: IDetailsListProps['onRenderRow'];
    isHeaderVisible?: boolean
}

export default function ListFieldInput(props: ListFieldInputFieldInputProps) {

    // LOGIC
    const { rowItems, groups, columns, onRenderRow, isHeaderVisible } = props;

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
            isHeaderVisible={isHeaderVisible}
        />
    )
}



