import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import i18n from "i18n";
import { selectProject } from "store/slices/projectslice";
import { useBoolean, useId } from "@fluentui/react-hooks";

import {
  Checkbox,
  ContextualMenu,
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  DetailsRow,
  Dialog,
  DialogFooter,
  DialogType,
  Dropdown,
  FontWeights,
  hiddenContentStyle,
  IButtonStyles,
  IColumn,
  IconButton,
  IDetailsColumnRenderTooltipProps,
  IDetailsFooterProps,
  IDetailsHeaderProps,
  IDetailsListProps,
  IDetailsListStyles,
  IDetailsRowStyles,
  IDropdownOption,
  IDropdownStyles,
  IRenderFunction,
  IStackProps,
  ITextFieldProps,
  ITextProps,
  Label,
  MarqueeSelection,
  mergeStyles,
  mergeStyleSets,
  Position,
  PrimaryButton,
  ScrollablePane,
  SelectionMode,
  SpinButton,
  Stack,
  Text,
  textAreaProperties,
  TextField,
  Toggle,
  TooltipHost,
  useTheme,
} from "@fluentui/react";

import {
  selectLanguage,
  selectSupportedLanguages,
} from "store/slices/languageslice";
import { Title } from "components/styled/text";
import { Col, Grid, Row } from "fluentui-react-grid";
import TextFieldInput from "components/inputs/text";
import { Field } from "formik";
import { Centered } from "components/styled/centered";
import React, { DetailedHTMLProps, SelectHTMLAttributes, useEffect, useState } from "react";
import ContextualHelpPanel from "components/sidepanel/contextualhelp";
import ContextualHelpContent from "components/sidepanel/contents/contextualhelp";
import BudgetList, { BudgetItemInfo } from "models/canadian/budget";
import { IActivityInfo } from "models/canadian/actvitiesmatrix";
import MeasurerUnitClass, { MeasureUnit } from "models/measurer-unit";
import { useMutation, useQuery } from "@apollo/client";
import { GET_MEASURER_UNIT } from "apollo/measurer-unit/query";
import DropdownFieldInput from "components/inputs/dropdown";
import { ADD_NEW_BUDGET_TEMPLATE, DELETE_BUDGET_TEMPLATE, GET_BUDGET_TEMPLATE, UPDATE_BUDGET_TEMPLATE } from "apollo/budget-template/query";
import BudgetTemplateClass, { BudgetTemplateItem } from "models/budget_template";
import { array } from "yup/lib/locale";
import { exec } from "child_process";
import { any } from "cypress/types/bluebird";
import { count } from "console";
import { GET_METHODOLOGY_BY_ID } from "apollo/methodologies/methodology";
import classNames from "classnames";

export default function UpdateMethodology() {
  // LOGIC
  const { t } = useTranslation("manage", { keyPrefix: "form" });
  const { t: t_basics } = useTranslation("basics", { keyPrefix: "languages" });
  const { form } = useParams<{ form: string }>();
  const { methodologyId } = useParams<{ methodologyId: string }>();
  const isIndex = form?.includes("index") ? true : false;
  const { palette } = useTheme();
  const [reload, setReload] = useState(false);

  // Language
  const lang = useSelector(selectLanguage);
  const project = useSelector(selectProject);
  const supportedLanguages = useSelector(selectSupportedLanguages);

  //Units measurers
  const unitMeasureData = useQuery(GET_MEASURER_UNIT);
  const [measurerUnitList, setmeasurerUnitList] = useState([]);

   //Methodology
   const methodologyData = useQuery(GET_METHODOLOGY_BY_ID, {
    variables: {
      "id": methodologyId
    },
  });
   
  //Data for budgetTemplates
  const budgetTemplateData = useQuery(GET_BUDGET_TEMPLATE);
  const budgetTemplateClass = new BudgetTemplateClass();
  const [addNewBudgetTemptaleTodo, mutationAddData] = useMutation(ADD_NEW_BUDGET_TEMPLATE)
  const [deleteBudgetTemptale, mutationDeleteBudgetTemplate] = useMutation(DELETE_BUDGET_TEMPLATE)
  const [updateBudgetTemptale, mutationUpdateBudgetTemplate] = useMutation(UPDATE_BUDGET_TEMPLATE)
  
  //Data for budget
  const currentForm = project.forms.find((form) => form.name === "budget")!;
  const budgetList = currentForm.structure as BudgetList; //Aqui se guarda el json de los budget - Ruta: store/projectslice
  const [items, setItems] = useState(budgetTemplateClass.listBudgetTemplate);
  const [update, setUpdate] = useState(false);

  //Prevent delete item Dialog
  const dialogStyles = { main: { maxWidth: 450 } };
  const dragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu,
    keepInBounds: true,
  };
  const screenReaderOnly = mergeStyles(hiddenContentStyle);
  const dialogContentProps = {
    type: DialogType.normal,
    title: t(`${form}.prevent-delete-dialog.header`),
    closeButtonAriaLabel: 'Close',
    subText: t(`${form}.prevent-delete-dialog.body`),
  };

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
      dragOptions: isDraggable ? dragOptions : undefined,
    }),
    [isDraggable, labelId, subTextId],
  );

  //DetailsList 
  const gridStyles: Partial<IDetailsListStyles> = {
    root: {
      overflowX: 'auto',
      width: 'auto',
      selectors: {
        '& [role=grid]': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          height: '85vh'
        }
      }
    },
    headerWrapper: {
      flex: '0 0 auto'
    },
    contentWrapper: {
      width: 'auto',
      flex: '1 1 auto',
      overflowY: 'auto',
      overflowX: 'auto'
    }
  };

  const classNames = mergeStyleSets({
    filter: {
      paddingBottom: 20,
      maxWidth: 300
    },
    header: {
      margin: 0
    },
    row: {
      flex: '0 0 auto'
    }
  });

  const onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = (props, defaultRender) => {
    if (!props) {
      return null;
    }
    const onRenderColumnHeaderTooltip: IRenderFunction<IDetailsColumnRenderTooltipProps> = (
      tooltipHostProps
    ) => <TooltipHost {...tooltipHostProps} />;
    return defaultRender!({
      ...props,
      onRenderColumnHeaderTooltip
    });
  };


  useEffect(() => {    
    //Initializing Units measurers
    if (!unitMeasureData.loading && unitMeasureData.data){
        setmeasurerUnitList(unitMeasureData.data.measureUnits)
    }

    //Initializing budgetTemplate
    if (!budgetTemplateData.loading && budgetTemplateData.data){
      //budgetTemplateClass.listBudgetTemplate = budgetTemplateData.data.budgetTemplates;
      //budgetTemplateClass.getOrderedList()
      //setItems(budgetTemplateClass.getOrderedList(budgetTemplateData.data.budgetTemplates));
      setItems((budgetTemplateData.data.budgetTemplates));
    }
  });

  // Panels
  const [
    helpPanelIsOpen,
    { setTrue: openHelpPanel, setFalse: dismissHelpPanel },
  ] = useBoolean(false);

  const suportedLangs = supportedLanguages.map((key) => {
    return {
      key: key,
      text: t_basics(key),
    };
  });

  let i18ncopy = i18n.cloneInstance({
    defaultNS: "forms",
    fallbackNS: ["licitations", "tutorials"],
  });

  // STYLES
  const hstackProps: IStackProps = {
    horizontal: true,
    tokens: {
      childrenGap: 10,
    },
  };

    // STYLE
    const classes = mergeStyleSets({
      submit_button: {
        height: 35,
        width: 120,
        minWidth: 40,
        fontSize: 14,
      },
      center: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      },
      select: {
        height: 35,
        backgroundColor: 'white',
        width: 150,
        minWidth: 40,
        fontSize: 14,
      },
    });

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


  //BUDGET FORM ------------------------------------------------------------------
  if (form === 'budget'){
      //Columns render handler--------------------------
      const ItemRender = (item: BudgetTemplateItem) => {
        const textProps: ITextProps = {
          styles: {
            root: {
              fontWeight: 500,
              maxWidth: 100,
            },
          },
        };

        return (
          <Stack horizontal tokens={{ childrenGap: 4 }}>
            <Text {...textProps}>{item.item} </Text>
          </Stack>
        )
      };

      const NameRender = (item: BudgetTemplateItem) => {
        let [currenItem, setCurrentItem] = useState(item.itemName)

        useEffect(() => {
          const timer = setTimeout(() => {
            const input = {
              id: item.id,
              item: item.item,
              itemName: currenItem,
              itemDescription: item.itemDescription,
              subtotal: item.subtotal,
              permanent: item.permanent,
              methodologyId: item.methodologyId,
              measureUnitId: item.measureUnitId
            }

            updateBudgetTemptale({
              variables: { input: input }
            })

          }, 1000)

          return () => clearTimeout(timer)
        }, [currenItem])


        const changeHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
          newValue = event.currentTarget.value;
          setCurrentItem(newValue)
          return newValue
        }

        const textFieldProps: ITextFieldProps = {
          rows: 1,
          multiline: true,
          resizable: true,
          autoAdjustHeight: true,
          defaultValue: "",
          styles: {
            root: {
              fontWeight: 500,
              width: '100%',
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
          styles: {
            root: {
              fontWeight: 500,
              minWidth: 50,
            },
          },
        };

        return (
          <Stack horizontal tokens={{ childrenGap: 4 }}>
            <TextField {...textFieldProps} value={currenItem} onChange={changeHandler} />
          </Stack>
        )
      };

      const DescriptionRender = (item: BudgetTemplateItem) => {
        let [currenItem, setCurrentItem] = useState(item.itemDescription)

        useEffect(() => {
          const timer = setTimeout(() => {
            const input = {
              id: item.id,
              item: item.item,
              itemName: item.itemName,
              itemDescription: currenItem,
              subtotal: item.subtotal,
              permanent: item.permanent,
              methodologyId: item.methodologyId,
              measureUnitId: item.measureUnitId
            }

            updateBudgetTemptale({
              variables: { input: input }
            })

          }, 1000)

          return () => clearTimeout(timer)
        }, [currenItem])

        const changeHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
          newValue = event.currentTarget.value;
          setCurrentItem(newValue)
          return newValue
      }

        const textFieldProps: ITextFieldProps = {
          rows: 1,
          multiline: true,
          resizable: true,
          autoAdjustHeight: true,
          defaultValue: "",
          styles: {
            root: {
              fontWeight: 500,
              width: '100%',
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
          styles: {
            root: {
              fontWeight: 500,
              minWidth: 200,
            },
          },
        };
    
        return (
          <Stack horizontal tokens={{ childrenGap: 4 }}>
            <TextField {...textFieldProps} value={currenItem} onChange={changeHandler} />
          </Stack>
        )
      };

      const MeasureRender = (item: BudgetTemplateItem) => {
        if (measurerUnitList){
          const handleChange = (event: any) => {
            if (event.target.value !== '') {
              const input = {
                id: item.id,
                item: item.item,
                itemName: item.itemName,
                itemDescription: item.itemDescription,
                subtotal: item.subtotal,
                permanent: item.permanent,
                methodologyId: item.methodologyId,
                measureUnitId: Number(event.target.value)
              }

              updateBudgetTemptale({
                variables: { input: input }
              })
            }
          }
          
          return (
            <select name="measureUnits" className={classes.select} onChange={handleChange}>
              <option key='' value='' >seleccionar</option>
              {measurerUnitList.map(( currentMeasureUnit: MeasureUnit ) => (
                    <option key={currentMeasureUnit.id} value={currentMeasureUnit.id} selected={(Number(currentMeasureUnit.id) === Number(item.measureUnitId))? true : false} >
                      {currentMeasureUnit.name}
                    </option>
                ))
              }
            </select>
          );
        }
      };

      const SubTotalRender = (item: BudgetTemplateItem) => {
        function _onChange(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) {
          const input  = {
            id: item.id,
            item: item.item,
            itemName: item.itemName,
            itemDescription: item.itemDescription,
            subtotal: isChecked,
            permanent: item.permanent,
            methodologyId: item.methodologyId,
            measureUnitId: item.measureUnitId
          }

          updateBudgetTemptale({
            variables: { input: input }
          })
        }

        return (
          <div style={{marginLeft: 20}}>
            {budgetTemplateClass.checkHasChild(item, items) > 1? 
              <Checkbox onChange={_onChange} checked={item.subtotal} /> :
              <TooltipHost content={t(`${form}.tooltip.subtotal`)}>
                <Checkbox disabled />
              </TooltipHost>
            }
          </div>
        );
      };

      const PermanentRender = (item: BudgetTemplateItem) => {
        function _onChange(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) {
          const input  = {
            id: item.id,
            item: item.item,
            itemName: item.itemName,
            itemDescription: item.itemDescription,
            subtotal: item.subtotal,
            permanent: isChecked,
            methodologyId: item.methodologyId,
            measureUnitId: item.measureUnitId
          }

          updateBudgetTemptale({
            variables: { input: input }
          })
        }

        return (
          <div style={{marginLeft: 25}}>
            <Checkbox onChange={_onChange} checked={item.permanent} />
          </div>
        );
      };

      const actionsRender = (item: BudgetTemplateItem) => {
        return (
          <React.Fragment>
            {budgetTemplateClass.getLevel(item) <= 3 ?( 
              <TooltipHost content={t(`${form}.tooltip.add`)}>
                <IconButton
                  iconProps={{ iconName: "Add" }}
                  styles={commandStyles}
                  onClick={() => handleAddItem(item)}
                />
              </TooltipHost>
            ) : ''}
                <TooltipHost content={t(`${form}.tooltip.delete`)}>
                  <IconButton
                    iconProps={{ iconName: "Cancel" }}
                    styles={commandStyles}
                    onClick={() => handleDeleteItem(item)}
                  />
                </TooltipHost>
            </React.Fragment>
        );
      };

      // Handlers
      const handleAddItem = (item?: BudgetTemplateItem) => {
          addNewBudgetTemptaleTodo({
            variables: { input: budgetTemplateClass.addNewItem(items, item) },
            refetchQueries: [{ query: GET_BUDGET_TEMPLATE }]
          })
      };

      const handleDeleteItem = (item: BudgetTemplateItem) => {
        if (budgetTemplateClass.checkHasChild(item, items) === 0){
          deleteBudgetTemptale({
            variables: { input: { id: item.id } },
            refetchQueries: [{ query: GET_BUDGET_TEMPLATE }]
          })
        }else{
          toggleHideDialog()
        }
      };

      const onRenderRow: IDetailsListProps["onRenderRow"] = (props) => {
        const customStyles: Partial<IDetailsRowStyles> = {};
    
        if (props) {
          const { item } = props;
          switch (budgetTemplateClass.getLevel(item)) {
            case 1:
              customStyles.root = {
                backgroundColor: palette.themeLighter,
                // fontSize: FontSizes.medium,
                ":hover": {
                  backgroundColor: palette.themeLighter,
                },
              };
              break;
            case 2:
              customStyles.root = {
                backgroundColor: palette.themeLighterAlt,
                ":hover": {
                  backgroundColor: palette.neutralLight,
                },
              };
              break;
            case 3:
              customStyles.root = {
                ":hover": {
                  backgroundColor: palette.neutralLighter,
                },
              };
              break;
          }

          return <DetailsRow {...props} styles={customStyles} />;
        }
        
        return null;
      };
    
      // Columns
      const columns: IColumn[] = [
        {
          key: "column1",
          name: t(`${form}.detail-list.column-item`),
          fieldName: "item",
          ariaLabel: "item",
          data: "string",
          minWidth: 50,
          maxWidth: 70,
          flexGrow: 1,
          isMultiline: true,
          isResizable: true,
          isRowHeader: true,
          onRender: (item: BudgetTemplateItem) => ItemRender(item),
        },
        {
          key: "column2",
          name: t(`${form}.detail-list.column-name`),
          fieldName: "item",
          ariaLabel: "item",
          data: "string",
          minWidth: 200,
          maxWidth: 400,
          flexGrow: 1,
          isMultiline: true,
          isResizable: true,
          isRowHeader: true,
          onRender: (item: BudgetTemplateItem) => NameRender(item),
        },
        {
          key: "column3",
          name: t(`${form}.detail-list.column-description`),
          fieldName: "itemDescription",
          ariaLabel: "itemDescription",
          data: "string",
          minWidth: 400,
          maxWidth: 650,
          flexGrow: 1,
          isMultiline: true,
          isResizable: true,
          isRowHeader: true,
          onRender: (item: BudgetTemplateItem) => DescriptionRender(item),
        },
        {
          key: "column4",
          name: t(`${form}.detail-list.column-measure-unit`),
          fieldName: "measureUnitId",
          ariaLabel: "measureUnitId",
          data: "Number",
          minWidth: 100,
          maxWidth: 200,
          flexGrow: 1,
          isMultiline: true,
          isResizable: true,
          isRowHeader: true,
          onRender: (item: BudgetTemplateItem) => MeasureRender(item),
        },
        {
          key: "column5",
          name: t(`${form}.detail-list.column-subtotal`),
          fieldName: "subtotal",
          ariaLabel: "subtotal",
          data: "Boolean",
          minWidth: 100,
          maxWidth: 100,
          flexGrow: 1,
          isMultiline: true,
          isResizable: true,
          isRowHeader: true,
          onRender: (item: BudgetTemplateItem) => SubTotalRender(item),
        },
        {
          key: "column6",
          name: t(`${form}.detail-list.column-permanent`),
          fieldName: "permanent",
          ariaLabel: "permanent",
          data: "Boolean",
          minWidth: 100,
          maxWidth: 100,
          flexGrow: 1,
          isMultiline: true,
          isResizable: true,
          isRowHeader: true,
          onRender: (item: BudgetTemplateItem) => PermanentRender(item),
        },
        {
          key: "column7",
          name: t(`${form}.detail-list.column-actions`),
          fieldName: "permanent",
          ariaLabel: "permanent",
          data: "string",
          minWidth: 100,
          maxWidth: 120,
          flexGrow: 1,
          isMultiline: true,
          isResizable: true,
          isRowHeader: true,
          onRender: (item: BudgetTemplateItem) => actionsRender(item),
        },
      ];

      return (
        <React.Fragment>
          <Title>{t(`${form}.header`)} {(methodologyData.data)? ' - ' + methodologyData.data.methodology.name : ''}</Title>

          {!budgetTemplateData.loading ? (
            <Grid dir="ltr">
              <Row>
                <Col>
                  <Label>{t(`${form}.first-row-button`)}</Label>
                </Col>
                <Col>
                  <IconButton
                    iconProps={{ iconName: "Add" }}
                    styles={commandStyles}
                    onClick={() => handleAddItem()}
                  />
                </Col>
              </Row>
              <Row>
                <Col sizeSm={12} sizeMd={12} sizeLg={12}>
                  <DetailsList
                    items={items}
                    columns={columns}
                    onRenderDetailsHeader={onRenderDetailsHeader}
                    styles={gridStyles}
                    selectionMode={SelectionMode.none}
                    onRenderRow={onRenderRow}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.justified}
                    //selectionPreservedOnEmptyClick={true}
                    />
                </Col>
              </Row>
            </Grid>
          ) : 'loading'}

          <Dialog
            hidden={hideDialog}
            onDismiss={toggleHideDialog}
            dialogContentProps={dialogContentProps}
            modalProps={modalProps}
          >
            <DialogFooter>
              <DefaultButton onClick={toggleHideDialog} text={t(`${form}.prevent-delete-dialog.button`)} />
            </DialogFooter>
          </Dialog>
          
        </React.Fragment>
      );
  }
  
  
  
  
  
  
  
  
  
  
  
  
  if (form === 'budget1'){
    return (
      <>
        <Title>{isIndex ? t("index") : i18ncopy.t(`${form}.header`)}</Title>

        <Grid dir="ltr">
          <Row>
            <Col sizeLg={4} sizeMd={4} sizeSm={12}>
              <TextField
                required
                label={t(`${form}.item-name`)}
                name="item_name"
                componentRef={TextFieldInput}
              />
            </Col>
            <Col sizeLg={4} sizeMd={4} sizeSm={12}>
              <TextField
                required
                label={t(`${form}.measure-unit-id`)}
                name="measure_unit_id"
                componentRef={TextFieldInput}
              />
            </Col>
            <Col sizeLg={4} sizeMd={4} sizeSm={12}>
              <TextField
                required
                label={t(`${form}.item-parent`)}
                name="item_parent"
                componentRef={TextFieldInput}
              />
            </Col>
          </Row>
          <Row>
            <Col sizeLg={12} sizeMd={12} sizeSm={12}>
              <TextField
                required
                label={t(`${form}.item-description`)}
                name="item_description"
                componentRef={TextFieldInput}
              />
            </Col>
          </Row>
          <Row>
            <Col sizeLg={4} sizeMd={4} sizeSm={12}>
              <Label>{t(`${form}.subtotal`)}</Label>
              <Checkbox />
            </Col>
          </Row>
          <Row>
            <Col sizeLg={12} sizeMd={12} sizeSm={12} className={classes.center} >
              <PrimaryButton text={t(`${form}.submit-button`)} className={classes.submit_button} />
            </Col>
          </Row>
        </Grid>
        <hr />
        <Grid dir="ltr">
          <Row>
            <Col sizeLg={12} sizeMd={12} sizeSm={12}>
              <label>Budget template</label>
            </Col>
          </Row>
          
        </Grid>
      </>
    );
  }


  
  
  
  return (
    <Stack
      tokens={{ childrenGap: 12 }}
      styles={{ root: { marginBottom: 8, paddingRight: 40 } }}
    >
      <Title>{isIndex ? t("index") : i18ncopy.t(`${form}.header`)}</Title>
      <Stack {...hstackProps}>
        <Stack.Item>
          {/* Maximal Amount <> */}
          <SpinButton
            label={t("amount.maximal-field")}
            defaultValue="0"
            min={0}
            max={100}
            step={1}
            incrementButtonAriaLabel="Increase value by 1"
            decrementButtonAriaLabel="Decrease value by 1"
            labelPosition={Position.top}
            // styles={styles}
          />
        </Stack.Item>
        <Stack.Item>
          {/* Minimal Amount <> */}
          <SpinButton
            label={t("amount.minimal-field")}
            defaultValue="0"
            min={0}
            max={100}
            step={1}
            incrementButtonAriaLabel="Increase value by 1"
            decrementButtonAriaLabel="Decrease value by 1"
            labelPosition={Position.top}
            // styles={styles}
          />
        </Stack.Item>
        <Stack.Item>
          {/* Top Amount [] */}
          <Label>{t("amount.top-field")}</Label>
          <Checkbox />
        </Stack.Item>
      </Stack>

      <Stack {...hstackProps}>
        <Stack.Item>
          {/* Maximal Characters <> */}
          <SpinButton
            label={t("characters.maximal-field")}
            defaultValue="0"
            min={0}
            max={100}
            step={1}
            incrementButtonAriaLabel="Increase value by 1"
            decrementButtonAriaLabel="Decrease value by 1"
            labelPosition={Position.top}
            // styles={styles}
          />
        </Stack.Item>

        {/* Top Characters [] */}
        <Stack.Item>
          <Label>{t("characters.top-field")}</Label>
          <Checkbox />
        </Stack.Item>
      </Stack>

      {/* Language select*/}
      <Dropdown
        label={t("language-field")}
        defaultSelectedKey={lang}
        // placeholder={t("language-select")}
        options={suportedLangs}
      />

      {/* Label name */}
      <TextField label={t("name-field")} />

      {/* Tooltip */}
      <TextField label={t("tooltip-field")} />

      {/* Definition */}
      <TextField label={t("definition-field")} />

      {/* Format */}
      <TextField label={t("format-field")} />
    </Stack>
  );
}


