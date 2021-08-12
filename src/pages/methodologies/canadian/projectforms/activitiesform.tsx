import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toNumber } from 'lodash';
import {
  FontSizes,
  IconButton,
  IColumn,
  IDetailsListProps,
  IDetailsRowStyles,
  DetailsRow,
  useTheme,
  Text,
  IButtonStyles,
  ITextFieldProps,
  TextField,
  TooltipHost,
  ITextStyles
} from '@fluentui/react';

import { selectProject } from 'store/slices/projectslice';
import ActivitiesMatrixGraph, { IActivityInfo } from 'models/canadian/actvitiesmatrix';
import ListFieldInput from "components/inputs/list"

export default function ActivitiesMatrixForm() {

  // LOGIC
  // State
  const project = useSelector(selectProject);
  const currentForm = project.forms.find(form => form.name === "logicModelActivities")!;
  const logicModelActivitiesMatrix = currentForm.structure as ActivitiesMatrixGraph;

  const initialItems = logicModelActivitiesMatrix.buidOutputsActivityList();

  const [items, setItems] = useState(initialItems);
  const [activitiesMatrix, setActivitiesMatrix] = useState(logicModelActivitiesMatrix);

  const { t } = useTranslation("logicmodel-activitymatrix-form");

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
      onRender: (item: IActivityInfo) => fieldRender(item)
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
      onRender: (item: IActivityInfo) => codeRender(item),
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
      onRender: (item: IActivityInfo) => descriptionRender(item),
    },
    {
      key: 'column4',
      name: '',
      fieldName: 'operators',
      minWidth: 70,
      data: 'string',
      isPadded: true,
      onRender: (item: IActivityInfo) => operatorsRender(item),
    },
  ]

  // Handlers
  const handleAddActivity = (itemId: string) => {
    const outputId = itemId.slice(0, 4);
    const activityId = itemId[4];

    setActivitiesMatrix(activitiesMatrix.addActivityToOutput(outputId, activityId));
    setItems(activitiesMatrix.buidOutputsActivityList());
  }

  const handleDeleteActivity = (itemId: string) => {
    const outputId = itemId.slice(0, 4);
    const activityId = (toNumber(itemId[4]) + 1).toString();

    setActivitiesMatrix(activitiesMatrix.deleteActivity(outputId, activityId));
    setItems(activitiesMatrix.buidOutputsActivityList());
  }

  // STYLES
  const { palette } = useTheme();

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

  const fieldRender = (item: IActivityInfo) => {
    const textStyles: ITextStyles = {
      root: {
        fontWeight: 600
      }
    }
    const variant = item.level === 0 ? "mediumPlus" : item.level === 1? "medium" : "small";

    return (
      <div style={{ textAlign: "end", color: "black" }}>
        <Text variant={variant} styles={textStyles}>{t(item.name)}</Text>
      </div>
    )
  }

  const codeRender = (item: IActivityInfo) => {
    return item.id
  }

  const descriptionRender = (item: IActivityInfo) => {

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

  const operatorsRender = (item: IActivityInfo) => {
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

    return (item.level === 2 &&
      <React.Fragment>
        <TooltipHost content={t("tooltip-add-act")}>
          <IconButton
            iconProps={{ iconName: "Add" }}
            styles={commandStyles}
            onClick={() => handleAddActivity(item.id)}
          />
        </TooltipHost>
        {item.hasSiblings &&
          <TooltipHost content={t("tooltip-delete-act")}>
            <IconButton
              iconProps={{ iconName: "Cancel" }}
              styles={commandStyles}
              onClick={() => handleDeleteActivity(item.id)}
            />
          </TooltipHost>
        }
      </React.Fragment>
    )
  }

  return <ListFieldInput
    rowItems={items}
    columns={columns}
    onRenderRow={onRenderRow}
    isHeaderVisible={false}
  />
}




