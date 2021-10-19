import { useTranslation } from 'react-i18next';
import { Scrollbars } from "react-custom-scrollbars";

import { IColumn, IGroup, DetailsList, SelectionMode } from '@fluentui/react'

import IContextualHelpContent from 'models/contextualhelp'

export default function ContextualHelpContent(content: IContextualHelpContent) {

    // LOGIC
    const { definition, example, format, guide, tips } = content;
    const { t } = useTranslation("forms", { keyPrefix: "contextual-help"})

    // Columns
    const columns: IColumn[] = [
        {
            key: 'column1',
            name: t('collapse'),
            fieldName: 'collapse',
            minWidth: 100,
            data: 'string',
            onRender: (item: string) => item,
            isMultiline: true,
        },
    ]

    // Base Items (without filter)
    const bodies = [definition, example, format, guide, tips]

    // Groups (filter those that have empty body)
    const titles = ["definition", "example", "format", "guide", "tips"]
        .filter((t, i) => bodies[i] !== "");
    // Items (filter those that have empty body)        
    const items = bodies.filter(t => t !== "");

    let groups = [] as IGroup[];
    let index = 0;

    for (var title of titles) {
        groups.push({
            key: `category-${title}`, name: t(title), startIndex: index++, count: 1
        })
    }

    return (
        <Scrollbars autoHide autoHeight autoHeightMin={100} autoHeightMax="calc(100vh - 75px)" >
            <DetailsList
                items={items}
                columns={columns}
                groups={groups}
                // onRenderRow={onRenderRow}
                selectionMode={SelectionMode.none}
                isHeaderVisible={true}
            />
        </Scrollbars>
    )
}
