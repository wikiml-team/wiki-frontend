import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  FontSizes,
  DetailsRow,
  Dropdown,
  IColumn,
  IDetailsListProps,
  IDetailsRowStyles,
  IconButton,
  useTheme,
  TooltipHost,
  IButtonStyles,
  FontWeights,
  IDropdownOption,
  DropdownMenuItemType,
  IDropdownStyles,
  Stack,
  Panel,
  TextField,
  PrimaryButton,
  DefaultButton
} from "@fluentui/react";
import { useBoolean } from '@fluentui/react-hooks';

import { selectProject } from "store/slices/projectslice";
import Stakeholders, { Category, IStakeholder, IStakholderInfo } from "models/canadian/stakeholders";
import ListFieldInput from "components/inputs/list"

export default function StakeholdersForm() {
  // LOGIC
  // State
  const { t } = useTranslation("stakeholders-form");

  const project = useSelector(selectProject);
  const currentForm = project.forms.find(form => form.name === "stakeholders")!;
  const stakeholdersModel = currentForm.structure as Stakeholders;

  const initialItems = stakeholdersModel.buidStakeholdersList();
  let groups = stakeholdersModel.buildStakeholdersGroups(t)

  const [items, setItems] = useState(initialItems);
  const [stakeholders, setStakeholders] = useState(stakeholdersModel);

  const [panelIsOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  const columns: IColumn[] = [
    {
      key: 'column1',
      name: t('roll-field'),
      fieldName: 'roll',
      minWidth: 10,
      maxWidth: 50,
      data: 'string',
      onRender: (item: IStakholderInfo) => mainStakeholderRender(item),
    },
    {
      key: 'column2',
      name: t('name-field'),
      styles: { root: { fontSize: 40 } },
      ariaLabel: 'Stakehoder',
      fieldName: 'name',
      minWidth: 10,
      data: 'string',
      isPadded: true,
      onRender: (item: IStakholderInfo) => fieldRender(item)
    },
    {
      key: 'column3',
      name: '',
      fieldName: 'operators',
      minWidth: 70,
      data: 'string',
      // isResizable: true,
      isPadded: true,
      // isFiltered: true,
      onRender: (item: IStakholderInfo) => operatorsRender(item),
    },
  ]

  // Handlers
  const handleAddStakeholder = (item: IStakholderInfo) => {
    setStakeholders(stakeholders.addStakeholder(item.orderInGroup, item.category));
    setItems(stakeholders.buidStakeholdersList());
    groups = stakeholdersModel.buildStakeholdersGroups(t);
  }

  const handleDeleteStakeholder = (item: IStakholderInfo) => {
    setStakeholders(stakeholders.deleteStakeholder(item.id));
    setItems(stakeholders.buidStakeholdersList());
    groups = stakeholdersModel.buildStakeholdersGroups(t);
  }

  const handleChangeMainStakeholder = (item: IStakholderInfo) => {
    setStakeholders(stakeholders.setMainStakeholder(item.id));
    setItems(stakeholders.buidStakeholdersList());
    groups = stakeholdersModel.buildStakeholdersGroups(t);
  }

  // STYLES
  const { palette } = useTheme();

  const fieldRender = (item: IStakholderInfo) => {
    const options: IDropdownOption[] = [
      { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
      { key: 'apple', text: 'Apple' },
      { key: 'banana', text: 'Banana' },
      { key: 'orange', text: 'Orange', disabled: true },
      { key: 'grape', text: 'Grape' },
      { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
      { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
      { key: 'broccoli', text: 'Broccoli' },
      { key: 'carrot', text: 'Carrot' },
      { key: 'lettuce', text: 'Lettuce' },
    ];

    const dropdownStyles: Partial<IDropdownStyles> = {
      dropdown: {
        width: 300,
      },
      title: {
        borderRadius: "0 0 2px 2px",
        border: `1px solid ${palette.neutralLighter}`,
      }
    }

    const commandStyles: Partial<IButtonStyles> = {
      root: {
        alignSelf: "center"
      },
      rootHovered: {
        backgroundColor: palette.themeLighter,
      },
      icon: {
        fontSize: 13,
        color: palette.black,
      },
    };

    return (
      <Stack horizontal>
        <Dropdown
          placeholder="Select a stakeholder"
          // defaultValue={t(item.name) || ""}
          options={options}
          styles={dropdownStyles}
        />

        <TooltipHost content={t(`tooltip-add-stakeholder-DB`)}>
          <IconButton
            iconProps={{ iconName: "AddFriend" }}
            styles={commandStyles}
            onClick={openPanel}
          />
        </TooltipHost>

      </Stack>
    )
  }

  const mainStakeholderRender = (item: IStakholderInfo) => {
    const bossIconStyles: Partial<IButtonStyles> = {
      root: {
        height: 25,
      },
      rootHovered: {
        backgroundColor: palette.neutralLighter,
      },
      icon: {
        fontSize: 15,
        fontWeight: FontWeights.bold,
        color: palette.black,
      },
    };

    const iconStyles: Partial<IButtonStyles> = {
      root: {
        height: 25,
      },
      rootHovered: {
        backgroundColor: palette.neutralLighter,
      },
      icon: {
        fontSize: 10,
        color: palette.neutralSecondary,
      },
    };

    return item.main ?
      <TooltipHost content={t(`tooltip-main-stakeholder-${item.category}`)}>
        <IconButton
          iconProps={{ iconName: "PartyLeader" }}
          styles={bossIconStyles}
        />
      </TooltipHost> :
      <TooltipHost content={t(`tooltip-change-main-stakeholder-${item.category}`)}>
        <IconButton
          iconProps={{ iconName: "Contact" }}
          styles={iconStyles}
          onClick={() => handleChangeMainStakeholder(item)}
        />
      </TooltipHost>
  }

  const operatorsRender = (item: IStakholderInfo) => {
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

    return <React.Fragment>
      <TooltipHost content={t("tooltip-add-stakeholder")}>
        <IconButton
          iconProps={{ iconName: "Add" }}
          styles={commandStyles}
          onClick={() => handleAddStakeholder(item)}
        />
      </TooltipHost>
      {item.hasSiblings &&
        <TooltipHost content={t("tooltip-delete-stakeholder")}>
          <IconButton
            iconProps={{ iconName: "Cancel" }}
            styles={commandStyles}
            onClick={() => handleDeleteStakeholder(item)}
          />
        </TooltipHost>
      }
    </React.Fragment>
  }

  const onRenderFooterContent = React.useCallback(
    () => (
      <div>
        <PrimaryButton onClick={dismissPanel} styles={{ root: { marginRight: 8 } }}>
          Save
        </PrimaryButton>
        <DefaultButton onClick={dismissPanel}>Cancel</DefaultButton>
      </div>
    ),
    [dismissPanel],
  );

  return <React.Fragment>
    <ListFieldInput
      rowItems={items}
      columns={columns}
      groups={groups}
      isHeaderVisible={true}
    />
    <Panel
      isOpen={panelIsOpen}
      closeButtonAriaLabel="Close"
      isHiddenOnDismiss={true}
      headerText={t("panel-header")}
      onDismiss={dismissPanel}
      isFooterAtBottom={true}
      onRenderFooterContent={onRenderFooterContent}
    >
      <div>
        {t("panel-explanation")}
        <br />
        <br />
        <TextField ariaLabel={"contentExplanation"} />
      </div>
    </Panel>
  </React.Fragment>
}
