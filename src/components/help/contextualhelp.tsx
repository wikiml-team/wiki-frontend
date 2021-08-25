import React from 'react'

import { IColumn, IGroup, DetailsList, SelectionMode } from '@fluentui/react'

import IContextualHelpContent from 'models/contextualhelp'
import { useTranslation } from 'react-i18next';

export default function ContextualHelpContent(content: IContextualHelpContent) {

    // LOGIC
    const { definition, example, format, guide, tips } = content;
    const { t } = useTranslation("contextual-help")

    // Columns
    const columns: IColumn[] = [
        {
            key: 'column1',
            name: t('collapse-all'),
            fieldName: 'collapse',
            minWidth: 100,
            data: 'string',
            onRender: (item: string) => item,
            isMultiline: true,
        },
    ]

    // Items
    const items = [definition, example, format, guide, tips]

    // Groups
    const titles = ["definition", "example", "format", "guide", "tips"]
    let groups = [] as IGroup[];
    let index = 0;

    for (var title of titles) {
        groups.push({
            key: `category-${title}`, name: t(`${title}-label`), startIndex: index++, count: 1
        })
    }

    return <DetailsList
        items={items}
        columns={columns}
        groups={groups}
        // onRenderRow={onRenderRow}
        selectionMode={SelectionMode.none}
        isHeaderVisible={true}
    />
}
