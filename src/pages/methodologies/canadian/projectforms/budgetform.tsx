import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { DetailsList, 
  DetailsRow, 
  IButtonStyles, 
  IColumn, 
  IconButton, 
  IDetailsListProps, 
  IDetailsRowStyles, 
  ITextFieldProps, 
  ITextStyles, 
  SelectionMode, 
  Text, 
  TextField, 
  TooltipHost, 
  useTheme } from "@fluentui/react";

import { selectProject } from "store/slices/projectslice";
import BudgetList, { BudgetItemInfo } from "models/canadian/budget";

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
      minWidth: 70,
      flexGrow: 1,
      isMultiline: true,
      onRender: (item: BudgetItemInfo) => nameRender(item),
    },
    {
      key: 'column2',
      name: t('price-field'),
      fieldName: 'price',
      ariaLabel: "price",
      minWidth: 70,
      maxWidth: 350,
      isRowHeader: true,
      data: 'number',
      onRender: (item: BudgetItemInfo) => columnValueRender(item, item.values?.price.toString() || '')
    },
    {
      key: 'column3',
      name: t('amount-field'),
      fieldName: 'amount',
      minWidth: 70,
      data: 'string',
      isResizable: true,
      isPadded: true,
      // isFiltered: true,
      onRender: (item: BudgetItemInfo) => columnValueRender(item, item.values?.amount.toString() || '')
    },
    {
      key: 'column4',
      name: t('actions-field'),
      fieldName: 'actions',
      minWidth: 100,
      data: 'string',
      isResizable: true,
      isPadded: true,
      isMultiline: true,
      // isFiltered: true,
      onRender: (item: BudgetItemInfo) => actionsRender(item)
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

  const columnValueRender = (item: BudgetItemInfo, value: string) => {
    const textFieldProps: ITextFieldProps = {
      defaultValue: value,
      styles: {
        root: {
          minWidth: 70,
          width: "4ch"
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

    return item.type === 'item' && <TextField {...textFieldProps}/>
  }

  const actionsRender = (item: BudgetItemInfo) => {
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

    return (item.type === 'item' &&
      <React.Fragment>
        <TooltipHost content={t("tooltip.contextual-help")}>
          <IconButton
            iconProps={{ iconName: "Help" }}
            styles={commandStyles}
            onClick={() => {}}
          />
        </TooltipHost>
        <TooltipHost content={t("tooltip.add-item")}>
          <IconButton
            iconProps={{ iconName: "Add" }}
            styles={commandStyles}
            onClick={() => {}}
          />
        </TooltipHost>
        {'hasSiblings' in item &&
          <TooltipHost content={t("tooltip.delete-item")}>
            <IconButton
              iconProps={{ iconName: "Cancel" }}
              styles={commandStyles}
              onClick={() => {}}
            />
          </TooltipHost>
        }
      </React.Fragment>
    )
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
              backgroundColor: palette.neutralLight,
            }
          }
          break;
        case 'item':
          customStyles.root = {
            ":hover": {
              backgroundColor: palette.neutralLighter,
            }
          }
          break;
        case 'subtotal':
            customStyles.root = {
            backgroundColor: item.level === 0 ? palette.neutralTertiaryAlt : palette.neutralLight,

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
