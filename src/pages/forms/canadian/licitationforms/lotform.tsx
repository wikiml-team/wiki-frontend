import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  DetailsList,
  DetailsListLayoutMode,
  DetailsRow,
  FontSizes,
  FontWeights,
  IButtonStyles,
  IColumn,
  IconButton,
  IDetailsListProps,
  IDetailsRowStyles,
  ITextFieldProps,
  ITextProps,
  SelectionMode,
  Stack,
  Text,
  TextField,
  TooltipHost,
  useTheme,
} from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";

import { selectProject } from "store/slices/projectslice";
import BudgetList, { BudgetItemInfo } from "models/canadian/budget";
import ContextualHelpPanel from "components/sidepanel/contextualhelp";
import ContextualHelpContent from "components/sidepanel/contents/contextualhelp";
import AutoSaveFormik from "components/form/autosaveform";
import TextFieldInput from "components/inputs/text";
import { values } from "lodash";
//Query-------------
import { useQuery } from "@apollo/client";
import { LotItem } from "models/canadian/acquisitions/lot";
import { GET_GROUP_ACQUISITIONS } from "apollo/lot";
import QueryStateIndicator from "apollo/indicator";
import { array } from "yup";


export default function BudgetForm() {
  // LOGIC
  const { t } = useTranslation("forms", { keyPrefix: "budget" });

  const project = useSelector(selectProject);
  const currentForm = project.forms.find((form) => form.name === "budget")!;
  const budgetList = currentForm.structure as BudgetList;

  const [items, setItems] = useState(budgetList.buildBudgetItemsList(false));

  const columns: IColumn[] = [
    {
      key: "column1",
      name:  "No. de Lote",  //t("unit-field"),
      fieldName: "lote",
      ariaLabel: "lote",
      minWidth: 80,
      maxWidth: 80,
      isResizable: true,
      data: "number",
      onRender: (item: BudgetItemInfo) =>
        ColumnValueEditor(item),
    },
    {
      key: "column2",
      name: t("item-field"),
      fieldName: "item",
      ariaLabel: "Items",
      data: "string",
      minWidth: 70,
      flexGrow: 1,
      isMultiline: true,
      isResizable: true,
      isRowHeader: true,
      onRender: (item: BudgetItemInfo) => NameRender(item),
    },
    {
      key: "column3",
      name: t("unit-field"),
      fieldName: "unit",
      ariaLabel: "unit",
      minWidth: 100,
      maxWidth: 350,
      isResizable: true,
      data: "number",
      onRender: (item: BudgetItemInfo) =>
        ColumnValueRender(item, getUnitValue(item), true, "unit"),
    },
    {
      key: "column4",
      name: t("price-field"),
      fieldName: "price",
      ariaLabel: "price",
      minWidth: 70,
      maxWidth: 350,
      data: "number",
      isResizable: true,
      onRender: (item: BudgetItemInfo) =>
        ColumnValueRender(item, getPriceValue(item), true),
    },
    {
      key: "column5",
      name: t("amount-field"),
      fieldName: "amount",
      minWidth: 70,
      data: "number",
      isResizable: true,
      isPadded: true,
      onRender: (item: BudgetItemInfo) =>
        ColumnValueRender(item, getAmountValue(item), true),
    },
    {
      key: "column6",
      name: t("total-field"),
      fieldName: "total",
      minWidth: 70,
      data: "number",
      isResizable: true,
      isPadded: true,
      onRender: (item: BudgetItemInfo) =>
        ColumnValueRender(item, getTotalCostValue(item), true),
    },
    
  ];

  // Get correct field value
  const getUnitValue = (item: BudgetItemInfo): string => {
    return (
      (item.type === "subtotal" && item.value.toString()) ||
      (item.type === "item" && item.values?.unit.toString()) ||
      ""
    );
  };

  const getPriceValue = (item: BudgetItemInfo): string => {
    return (item.type === "item" && item.values?.price.toString()) || "";
  };

  const getAmountValue = (item: BudgetItemInfo): string => {
    return (item.type === "item" && item.values?.amount.toString()) || "";
  };

  const getTotalCostValue = (item: BudgetItemInfo): string => {
    return (item.type === "item" && item.cost.toString()) || "";
  };

  // Handlers
  const handleAddItem = (itemId: string) => {
    budgetList.addItem(itemId, 0);
    setItems(budgetList.buildBudgetItemsList(true));
  };

  const handleDeleteItem = (itemId: string) => {
    budgetList.deleteItem(itemId);
    setItems(budgetList.buildBudgetItemsList(true));
  };

  const handleInputChange = (
    event: { target: HTMLInputElement },
    newValue:String
  ):void => {
    const { name } = event.target;
    //setUser({ ...user, [name]: newValue });
  };

  // Panels
  const [
    helpPanelIsOpen,
    { setTrue: openHelpPanel, setFalse: dismissHelpPanel },
  ] = useBoolean(false);

  // STYLES
  const { palette } = useTheme();

  const NameRender = (item: BudgetItemInfo) => {
    const variant = item.type === "title" ? "mediumPlus" : "medium";
    const space = item.level * 2;
    const prefix = item.type === "subtotal" ? t("subtotal-type") : "";

    // const [textValue, setTextValue] = useState(`${prefix} ${item.name}`)

    // const onChangeTextFieldValue = React.useCallback(
    //   (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    //     setTextValue(newValue || '');
    //   },
    //   [],
    // );

    const textProps: ITextProps = {
      variant: variant,
      styles: {
        root: {
          fontWeight: 500,
          paddingLeft: space + "em",
        },
      },
    };

    return (
      <Stack horizontal tokens={{ childrenGap: 4 }}>
        <Text {...textProps}>{item.id} {`${prefix} ${item.name}`}</Text>
      </Stack>
    )
  };

  const ColumnValueRender = (
    item: BudgetItemInfo,
    value: string,
    fixedcolumn?: boolean,
    columnName?: string
  ) => {
    const textFieldProps: ITextFieldProps = {
      value: value,
      // onChange: onChangeTextFieldValue,
      styles: {
        root: {
          minWidth: 70,
          width: columnName === "unit" ? "12ch" : "8ch",
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
    };

    const textProps: ITextProps = {
      variant: "medium",
      styles: {
        root: {
          fontWeight:
            item.type === "subtotal" ? FontWeights.semibold : FontWeights.light,
        },
      },
    };

    const fixedCell = fixedcolumn || item.type === "subtotal" || value === "";
    switch (fixedCell) {
      case true:
        return (
          <div style={{ padding: 8 }}>
            <Text {...textProps}>{value}</Text>
          </div>
        );
      default:
        return <TextField {...textFieldProps} />;
    }
  };

  const ColumnValueEditor = (
    item: BudgetItemInfo
  ) => {
    let [currentLot, setCurrentLot] = useState('')

    const changeHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
      newValue = event.currentTarget.value;
      setCurrentLot(newValue)
      console.log(currentLot)
      return newValue
   }

    return <TextField value={currentLot} id={item.id} onChange={changeHandler} /> 
  };

  const onRenderRow: IDetailsListProps["onRenderRow"] = (props) => {
    const customStyles: Partial<IDetailsRowStyles> = {};

    if (props) {
      const { item } = props;
      switch (item.type) {
        case "title":
          customStyles.root = {
            backgroundColor: palette.themeLighter,
            // fontSize: FontSizes.medium,
            ":hover": {
              backgroundColor: palette.themeLighter,
            },
          };
          break;
        case "subtitle":
          customStyles.root = {
            backgroundColor: palette.themeLighterAlt,
            ":hover": {
              backgroundColor: palette.neutralLight,
            },
          };
          break;
        case "item":
          customStyles.root = {
            ":hover": {
              backgroundColor: palette.neutralLighter,
            },
          };
          break;
        case "subtotal":
          customStyles.root = {
            backgroundColor:
              item.level === 0
                ? palette.neutralTertiaryAlt
                : palette.neutralLight,

            ":hover": {
              backgroundColor: palette.neutralQuaternaryAlt,
            },
          };
          break;
      }

      return <DetailsRow {...props} styles={customStyles} />;
    }
    return null;
  };

  //DATA-----------------------
  let [listLot, setListLot] = useState([])

  /*
  const listLot = useQuery<LotItem[]>(GET_GROUP_ACQUISITIONS, {
    variables: {project}
  });

  if (!listLot.data || listLot.loading) {
    return (
      <QueryStateIndicator
        data={listLot.data}
        loading={listLot.loading}
        error={listLot.error}
      />
    );
  }*/

  

  

  return (
    <>
      <form>
        <React.Fragment>
          <DetailsList
            items={items}
            columns={columns}
            onRenderRow={onRenderRow}
            selectionMode={ SelectionMode.none }
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selectionPreservedOnEmptyClick={true}
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
              tips="Tips Lorem ipsum dolre mas seit cause frieto mei suilka fraterni de su vormetto. Cosi se me face le buc torbellini de sua me. "
            />
          </ContextualHelpPanel>
        </React.Fragment>
      </form>
    </>
  );
}
