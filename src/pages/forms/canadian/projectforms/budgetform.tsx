import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  DetailsList,
  DetailsRow,
  IButtonStyles,
  IColumn,
  IconButton,
  IDetailsListProps,
  IDetailsRowStyles,
  ITextFieldProps,
  SelectionMode,
  Stack,
  Text,
  TextField,
  TooltipHost,
  FontSizes,
  useTheme,
  DetailsListLayoutMode,
  ITextProps
} from "@fluentui/react";
import { useBoolean } from '@fluentui/react-hooks';

import { selectProject } from "store/slices/projectslice";
import BudgetList, { BudgetItemInfo } from "models/canadian/budget";
import ContextualHelpPanel from "components/sidepanel/contextualhelp";
import ContextualHelpContent from "components/sidepanel/contents/contextualhelp";

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
      onRender: (item: BudgetItemInfo) => NameRender(item),
    },
    {
      key: 'column2',
      name: t('unit-field'),
      fieldName: 'unit',
      ariaLabel: "unit",
      minWidth: 100,
      maxWidth: 350,
      isRowHeader: true,
      data: 'number',
      onRender: (item: BudgetItemInfo) => ColumnValueRender(item, getUnitValue(item), false, 'unit')
    },
    {
      key: 'column3',
      name: t('price-field'),
      fieldName: 'price',
      ariaLabel: "price",
      minWidth: 70,
      maxWidth: 350,
      isRowHeader: true,
      data: 'number',
      onRender: (item: BudgetItemInfo) => ColumnValueRender(item, getPriceValue(item))
    },
    {
      key: 'column4',
      name: t('amount-field'),
      fieldName: 'amount',
      minWidth: 70,
      data: 'string',
      isResizable: true,
      isPadded: true,
      onRender: (item: BudgetItemInfo) => ColumnValueRender(item, getAmountValue(item))
    },
    {
      key: 'column5',
      name: t('total-field'),
      fieldName: 'total',
      minWidth: 70,
      data: 'string',
      isResizable: true,
      isPadded: true,
      onRender: (item: BudgetItemInfo) => ColumnValueRender(item, getTotalCostValue(item), true)
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
      onRender: (item: BudgetItemInfo) => actionsRender(item)
    }
  ]

  // Get correct field value
  const getUnitValue = (item: BudgetItemInfo): string => {
    return (item.type === 'item' && item.values?.unit.toString()) || ''
  }

  const getPriceValue = (item: BudgetItemInfo): string => {
    return (item.type !== 'subtotal' && item.values?.price.toString()) ||
      (item.type === 'subtotal' && item.value.toString()) || ''
  }

  const getAmountValue = (item: BudgetItemInfo): string => {
    return (item.type === 'item' && item.values?.amount.toString()) || ''
  }

  const getTotalCostValue = (item: BudgetItemInfo): string => {
    return (item.type === 'item' && item.cost.toString()) || ''
  }

  // Handlers
  const handleAddItem = (itemId: string) => {
    budgetList.addItem(itemId)
    setItems(budgetList.buildBudgetItemsList(true));
  }

  const handleDeleteItem = (itemId: string) => {
    budgetList.deleteItem(itemId)
    setItems(budgetList.buildBudgetItemsList(true));
  }

  // Panels
  const [helpPanelIsOpen, { setTrue: openHelpPanel, setFalse: dismissHelpPanel }] = useBoolean(false);

  // STYLES
  const { palette } = useTheme()

  const NameRender = (item: BudgetItemInfo) => {
    const variant = item.type === 'title' ? "mediumPlus" : "medium";
    const space = item.level * 2
    const prefix = item.type === 'subtotal' ? t('subtotal-type') : ''

    // const [textValue, setTextValue] = useState(`${prefix} ${item.name}`)

    // const onChangeTextFieldValue = React.useCallback(
    //   (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    //     setTextValue(newValue || '');
    //   },
    //   [],
    // );

    const textFieldProps: ITextFieldProps = {
      value: item.name,
      multiline: true,
      resizable: false,
      // onChange: onChangeTextFieldValue,
      styles: {
        root: {
          backgroundColor: "inherit",
        },
        fieldGroup: {
          backgroundColor: "transparent",
          borderColor: 'transparent',
          borderRadius: "0 0 2px 2px",
          selectors: {
            ":hover": {
              borderColor: palette.neutralTertiary,
            },
          },
        },
        field: {
          backgroundColor: "transparent",
          fontSize: item.type === 'title' ? FontSizes.mediumPlus : FontSizes.medium
        }
      },
    }

    const textProps: ITextProps = {
      variant: variant,
      styles: {
        root: {
          fontWeight: 500,
          paddingLeft: space + "em",
        }
      }
    }

    return item.type === 'subtotal' ?
      <Text {...textProps}>{`${prefix} ${item.name}`}</Text> :

      <Stack horizontal tokens={{ childrenGap: 4 }}>
        <Stack.Item styles={{ root: { paddingTop: 5 } }}>
          <Text {...textProps}>{item.id}</Text>
        </Stack.Item>
        <Stack.Item grow>
          <TextField {...textFieldProps} />
        </Stack.Item>
      </Stack>
  }

  const ColumnValueRender = (item: BudgetItemInfo, value: string, fixedcolumn?: boolean, columnName?: string) => {

    // const [textValue, setTextValue] = useState(value)

    // const onChangeTextFieldValue = React.useCallback(
    //   (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    //     setTextValue(newValue || '');
    //   },
    //   [],
    // );

    const textFieldProps: ITextFieldProps = {
      value: value,
      // onChange: onChangeTextFieldValue,
      styles: {
        root: {
          minWidth: 70,
          width: columnName === 'unit' ? "12ch" : '8ch',
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

    const fixedCell = fixedcolumn || item.type === 'subtotal' || value === ''
    switch (fixedCell) {
      case true:
        return (
          <div style={{ padding: 8 }}>
            <Text variant="medium">{value}</Text>
          </div>
        )
      default:
        return <TextField {...textFieldProps} />
    }
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
            onClick={() => openHelpPanel()}
          />
        </TooltipHost>
        <TooltipHost content={t("tooltip.add-item")}>
          <IconButton
            iconProps={{ iconName: "Add" }}
            styles={commandStyles}
            onClick={() => handleAddItem(item.id)}
          />
        </TooltipHost>
        {'hasSiblings' in item && item.hasSiblings &&
          <TooltipHost content={t("tooltip.delete-item")}>
            <IconButton
              iconProps={{ iconName: "Cancel" }}
              styles={commandStyles}
              onClick={() => handleDeleteItem(item.id)}
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

  return <React.Fragment>
    <DetailsList
      items={items}
      columns={columns}
      onRenderRow={onRenderRow}
      selectionMode={SelectionMode.none}
      layoutMode={DetailsListLayoutMode.justified}
    />
    <ContextualHelpPanel
      isOpen={helpPanelIsOpen}
      onDismiss={dismissHelpPanel}
    >
      <ContextualHelpContent
        definition="Def Lorem ipsum dolre mas seit cause frieto mei suilka fraterni de su vormetto. Cosi se me face le buc torbellini de sua me. "
        example=""
        format="Cosi se me face le buc torbellini de sua me."
        guide="Guide Lorem ipsum dolre mas seit cause frieto mei suilka fraterni de su vormetto. Cosi se me face le buc torbellini de sua me. "
        tips="Tips Lorem ipsum dolre mas seit cause frieto mei suilka fraterni de su vormetto. Cosi se me face le buc torbellini de sua me. " />
    </ContextualHelpPanel>
  </React.Fragment>
}
