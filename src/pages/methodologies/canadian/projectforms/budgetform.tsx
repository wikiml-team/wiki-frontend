import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { DetailsList, DetailsRow, IColumn, IDetailsListProps, IDetailsRowStyles, ITextStyles, SelectionMode, Text, useTheme } from "@fluentui/react";

import { selectProject } from "store/slices/projectslice";
import BudgetList, { BudgetItem, BudgetItemInfo, LevelBudgetItem } from "models/canadian/budget";

export default function BudgetForm() {

  // LOGIC
  const { t } = useTranslation("forms", { keyPrefix: "budget" });

  const project = useSelector(selectProject);
  const currentForm = project.forms.find(form => form.name === "budget")!;
  const budgetList = currentForm.structure as BudgetList;

  const [items, setItems] = useState(budgetList.buildBudgetItemsList(true))

  const columns: IColumn[] = [
    {
      key: 'column1',
      name: t('item-field'),
      fieldName: 'item',
      ariaLabel: 'Items',
      data: 'string',
      minWidth: 10,
      flexGrow: 1,
      isMultiline: true,
      onRender: (item: BudgetItemInfo) => nameRender(item),
    },
    {
      key: 'column2',
      name: t('price-field'),
      fieldName: 'price',
      ariaLabel: "price",
      minWidth: 0,
      maxWidth: 350,
      isRowHeader: true,
      data: 'number',
      onRender: (item: BudgetItem) => item.values?.price || ''
    },
    {
      key: 'column3',
      name: t('amount-field'),
      fieldName: 'amount',
      minWidth: 70,
      data: 'string',
      isResizable: true,
      isPadded: true,
      isMultiline: true,
      // isFiltered: true,
      onRender: (item: BudgetItem) => item.values?.amount || ''
    }
  ]

  // STYLES
  const { palette } = useTheme()
  const nameRender = (item: BudgetItemInfo) => {
    const variant = item.type === 'title' ? "mediumPlus" : "medium" ;
    const space = item.level * 2
    
    const textStyles: ITextStyles = {
      root: {
        fontWeight: 500,
        paddingLeft: space + "em"
      }
    }

    const prefix =  item.type === 'subtotal'? t('subtotal-prefix') : ''
    return <Text variant={variant} styles={textStyles}>{`${prefix} ${item.id} ${item.name}`}</Text>
  }

  const onRenderRow: IDetailsListProps['onRenderRow'] = props => {
    const customStyles: Partial<IDetailsRowStyles> = {}

    if (props) {
      const { item } = props;
      switch (item.type) {
        case 'title':
          customStyles.root = {
            backgroundColor: palette.themeLighter,
            // fontSize: FontSizes.medium,
            ":hover": {
              backgroundColor: palette.themeLighter,
            }
          }
          break;
        case 'subtitle':
          customStyles.root = {
            backgroundColor: palette.themeLighterAlt,
            ":hover": {
              backgroundColor: palette.neutralQuaternaryAlt,
            }
          }
          break;
        case 'item':
          customStyles.root = {
            ":hover": {
              backgroundColor: palette.neutralLight,
            }
          }
          break;
        case 'subtotal':
            customStyles.root = {
            backgroundColor: palette.neutralLight,

              ":hover": {
                backgroundColor: palette.neutralQuaternaryAlt,
              }
            }
            break;
      }

      return <DetailsRow {...props} styles={customStyles} />;
    }
    return null;
};

  return <DetailsList
          items={items}
          columns={columns}
          onRenderRow={onRenderRow}
          selectionMode={SelectionMode.none}
        />;
}
