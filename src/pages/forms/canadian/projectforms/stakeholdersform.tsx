import React, { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { IDetailsGroupRenderProps, IGroup, ILabelStyles, TooltipHostBase } from '@fluentui/react';

import {
  DefaultButton,
  DetailsList,
  Dropdown,
  FontWeights,
  IButtonStyles,
  IColumn,
  IconButton,
  IDropdownOption,
  IDropdownStyles,
  Panel,
  PrimaryButton,
  SelectionMode,
  Stack,
  TooltipHost,
  useTheme,
} from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";

import { selectProject } from "store/slices/projectslice";
import Stakeholders, { Category, IStakholderInfo } from "models/canadian/stakeholders";
import { AddStakehoderPanelContent } from "components/sidepanel/contents/stakeholder";
import { useMutation, useQuery } from "@apollo/client";
import QueryStateIndicator from "apollo/indicator";
import { CREATE_PROJECT_STAKEHOLDER, GET_PROJECT_STAKEHOLDER, GET_PROYECT_STAKEHOLDERS, GET_STAKEHOLDERS, GET_STAKEHOLDERS_CATEGORIES } from "apollo/stakeholders/projectstakeholder";
import { useParams } from "react-router-dom";
import { flowRight } from "cypress/types/lodash";


export default function StakeholdersForm() {
  // LOGIC
  const { t } = useTranslation("forms", { keyPrefix: "stakeholders" });
  const { projectId } = useParams<any>();

  const project = useSelector(selectProject);
  const currentForm = project.forms.find(
    (form) => form.name === "stakeholders"
  )!;
  const stakeholdersModel = currentForm.structure as Stakeholders;

  let initialItems = stakeholdersModel.buidStakeholdersList();
  let groups: IGroup[] = [];

  let countries: IDropdownOption[] = []

  //const [items, setItems] = useState(initialItems);
  let [items, setItems] = useState<IStakholderInfo[]>([]);
  let listItems: IStakholderInfo[] = []
  
  //let items: IStakholderInfo[] = []

  let options: IDropdownOption[] = []
  /*
  const options: IDropdownOption[] = [
    { key: "0", text: "--None--" },
    { key: "1", text: "Stakeholder1" },
    { key: "2", text: "Stakeholder2" },
    { key: "3", text: "Stakeholder3" },
    { key: "4", text: "Stakeholder4" },
    { key: "5", text: "Stakeholder5" },
    { key: "6", text: "Stakeholder6" },
    { key: "7", text: "Stakeholder7" },
    { key: "8", text: "Stakeholder8" },
    { key: "9", text: "Stakeholder9" },
  ];
  */

  //const [stakeholders, setStakeholders] = useState(stakeholdersModel);

  const [panelIsOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  // DATA----------------------------------------------------------------------------------------------------------------------------
  let stakeholdersCategoriesResponse  = useQuery(GET_STAKEHOLDERS_CATEGORIES);
  let projectStakeholdersResponse     = useQuery(GET_PROYECT_STAKEHOLDERS);
  let stakeholdersResponse            = useQuery(GET_STAKEHOLDERS);
  let getStakeholderResponse          = useQuery(GET_PROJECT_STAKEHOLDER);
  const countriesData                 = require('models/countries.json');

  //Mutations------------------------------------------------------------------------------------------------------------------------
  const [createProjectStakeholder, mutationCreateProjectStakeholder] = useMutation(CREATE_PROJECT_STAKEHOLDER)

  const columns: IColumn[] = [
    {
      key: "column1",
      name: t("roll-field"),
      fieldName: "roll",
      minWidth: 100,
      maxWidth: 100,
      data: "string",
      onRender: (item: IStakholderInfo) => mainStakeholderRender(item),
    },
    {
      key: "column2",
      name: t("header"),
      styles: { root: { fontSize: 40 } },
      ariaLabel: "Stakehoder",
      fieldName: "name",
      minWidth: 500,
      isResizable: true,
      data: "string",
      isPadded: true,
      onRender: (item: IStakholderInfo) => fieldRender(item),
    },
    {
      key: "column3",
      name: t("action-field"),
      fieldName: "operators",
      minWidth: 70,
      data: "string",
      isPadded: true,
      // isFiltered: true,
      onRender: (item: IStakholderInfo) => actionsRender(item),
    },
  ];

  // Handlers
  const handleAddStakeholder = (item: IStakholderInfo) => {
    const newSh = {
      id: 0,
      name: '',
      category: item.category,
      main: false,
      orderInGroup: item.orderInGroup + 1,
      hasSiblings: true
    } 

    //listItems.push(newSh)
    setItems(listItems)
    
    /*setStakeholders(
      stakeholders.addStakeholder(item.orderInGroup, item.category)
    );
    //setItems(stakeholders.buidStakeholdersList());
    groups = stakeholdersModel.buildStakeholdersGroups(t);*/

    /*let { data, loading, error } = useQuery(GET_PROJECT_STAKEHOLDER, {
      variables: { id: projectId },
    }); */

  };

  const handleDeleteStakeholder = (item: IStakholderInfo) => {
    /*setStakeholders(stakeholders.deleteStakeholder(item.id));
    //setItems(stakeholders.buidStakeholdersList());
    groups = stakeholdersModel.buildStakeholdersGroups(t);*/
  };

  const handleChangeMainStakeholder = (item: IStakholderInfo) => {
    /*if (!item.category.hasNoMain) {
      setStakeholders(stakeholders.setMainStakeholder(item.id));

      //setItems(stakeholders.buidStakeholdersList());
      groups = stakeholdersModel.buildStakeholdersGroups(t);
    }*/
  };

  const changeStakeHolder = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
    if (option?.key){
      alert(String(option?.key))
    }
    return option
  }

  function getCountries() {
    try{
        countries = []
        countriesData.map((currentCountry: any) => {
          let item = {
            key: currentCountry.cca2,
            text: currentCountry.name.common,
            isSelected: false
          };
          countries.push(item)
        });
        countries.sort((a,b) => (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0))
    }catch(error){
        console.log(error)
    } 
} 
getCountries()



  function validateStakeholderProjectExist(idCategory: number, idStakeholder: number){
    let isIncluded = false
    let listStakeholdersCategory: number[] = []
    projectStakeholdersResponse.data.projectStakeholders.map((currentStakeholder: any) => {
      if (Number(currentStakeholder.projectId) === Number(projectId) && Number(currentStakeholder.stakeholderCategoryId) === Number(idCategory)){
        listStakeholdersCategory.push(currentStakeholder.stakeholder.id)
      }
    })

    for (let i=0; i<listStakeholdersCategory.length; i++){
      if (Number(listStakeholdersCategory[i]) === Number(idStakeholder)){
        isIncluded = true
        break
      }
    }
    return isIncluded
  }

  // STYLES
  const { palette } = useTheme();

  const fieldRender = (item: IStakholderInfo) => {
    

    const dropdownStyles: Partial<IDropdownStyles> = {
      root: {
        width: "50%",
      },
      dropdown: {
        minWidth: 300,
      },
      title: {
        borderRadius: "0 0 2px 2px",
        border: `1px solid ${palette.neutralLighter}`,
        selectors: {
          "::after": {
            border: `1px solid ${palette.red}`,
          },
        },
      },
    };

    const commandStyles: Partial<IButtonStyles> = {
      root: {
        alignSelf: "center",
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
      <Stack horizontal styles={{ root: { minWidth: 800 } }}>
        <Dropdown
          placeholder={t("select-placeholder")}
          defaultSelectedKey={item.id}
          options={options}
          styles={dropdownStyles}
          onChange={changeStakeHolder}
        />

        <TooltipHost content={t(`tooltip.add-stakeholder-DB`)}>
          <IconButton
            iconProps={{ iconName: "AddFriend" }}
            styles={commandStyles}
            onClick={openPanel}
          />
        </TooltipHost>
      </Stack>
    );
  };

  const mainStakeholderRender = (item: IStakholderInfo) => {
    const bossIconStyles: Partial<IButtonStyles> = {
      root: {
        height: 25,
        cursor: 'auto'
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

      return item.main ? (
        <TooltipHost content={t(`tooltip.main-stakeholder-${item.category.name}`)} >
          <IconButton
            iconProps={{ iconName: "PartyLeader" }}
            styles={bossIconStyles}
          /> 
        </TooltipHost>
      ) : (
        <TooltipHost content={t(`tooltip.change-main-stakeholder-${item.category.name}`)} >
          <IconButton
            iconProps={{ iconName: "Contact" }}
            styles={iconStyles}
            onClick={() => handleChangeMainStakeholder(item)}
          />
        </TooltipHost>
      );
  }

    
    
    
    

  const actionsRender = (item: IStakholderInfo) => {
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

    return (
      <React.Fragment>
        {/*   
        <TooltipHost content={t("tooltip.add-stakeholder")}>
          <IconButton
            iconProps={{ iconName: "Add" }}
            styles={commandStyles}
            onClick={() => handleAddStakeholder(item)}
          />
        </TooltipHost>
        */}
          <TooltipHost content={t("tooltip.delete-stakeholder")}>
            <IconButton
              iconProps={{ iconName: "Cancel" }}
              styles={commandStyles}
              onClick={() => handleDeleteStakeholder(item)}
            />
          </TooltipHost>
      </React.Fragment>
    );
  };

  const onRenderFooterContent = useCallback(
    () => (
      <div>
        <PrimaryButton
          onClick={dismissPanel}
          styles={{ root: { marginRight: 8 } }}
        >
          Save
        </PrimaryButton>

        <DefaultButton onClick={dismissPanel}>Cancel</DefaultButton>
      </div>
    ),
    [dismissPanel]
  );

  const onRenderGroupHeader: IDetailsGroupRenderProps['onRenderHeader'] = props => {
    const labelStyles: Partial<React.CSSProperties | undefined> = {
      fontSize: 16,
    };

    const commandStyles: Partial<IButtonStyles> = {
      root: {
        height: 30,
        float: 'right',
        marginRight: 70
      },
      rootHovered: {
        backgroundColor: palette.neutralLighter,
      },
      icon: {
        fontSize: 13,
        color: palette.black,
      },
    };

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

    if (props) {
      return (
        <React.Fragment>
          <label style = {labelStyles}> <b>{props.group!.name} ({props.group!.count})</b></label>
          <TooltipHost /*content={t(`tooltip.main-stakeholder-${item.category.name}`)}*/ content={props.group!.data.category.description} >
            <IconButton
              iconProps={{ iconName: "SurveyQuestions" }}
              styles={bossIconStyles}
            />
          </TooltipHost>
          
          <IconButton
            iconProps={{ iconName: "Add" }}
            styles={commandStyles}
            //onClick={() => handleAddStakeholder(item)}
          />
        </React.Fragment>
      );
    }
    return null;
  };

  //Initial load of the data
  useEffect(() => {
    if (stakeholdersCategoriesResponse.data && projectStakeholdersResponse.data && stakeholdersResponse.data){
      let index = 1;

      //setting the stakeholders options 
      options.push(
        { key: 0, text: '--None--', data: null }
      )
      stakeholdersResponse.data.stakeholders.map((currentStakeholder: any) => {
        options.push(
          { key: currentStakeholder.id, text: currentStakeholder.name, data: null }
        )
      })

      stakeholdersCategoriesResponse.data.stakeholderCategories.map((current: any) => {
        let count = 0
        //stakeholders of current category
        projectStakeholdersResponse.data.projectStakeholders.map((currentStakeholder: any) => {
          if (Number(currentStakeholder.stakeholderCategoryId) === Number(current.id) && Number(currentStakeholder.projectId) === Number(projectId)){
            let stakholderInfo = {
              id: currentStakeholder.stakeholder.id,
              name: currentStakeholder.stakeholder.name,
              category: current.id,
              main: currentStakeholder.main,
              orderInGroup: 1,
              hasSiblings: count > 0
            }
            listItems.push(stakholderInfo)
            //setItems([...items, stakholderInfo])
            
            count++
          }
        })
        //Adding category to list
        groups.push({
          key: current.id, name: current.name, startIndex: index, count:count, data: {category: current}
        })
        index += 1;
      });
    }
  }); 

  if (!stakeholdersCategoriesResponse.data || stakeholdersCategoriesResponse.loading) {
    return (
      <QueryStateIndicator
        data={stakeholdersCategoriesResponse.data}
        loading={stakeholdersCategoriesResponse.loading}
        error={stakeholdersCategoriesResponse.error}
      />
    );
  }

  if (!projectStakeholdersResponse.data || projectStakeholdersResponse.loading) {
    return (
      <QueryStateIndicator
        data={projectStakeholdersResponse.data}
        loading={projectStakeholdersResponse.loading}
        error={projectStakeholdersResponse.error}
      />
    );
  }   

  if (!stakeholdersResponse.data || stakeholdersResponse.loading) {
    return (
      <QueryStateIndicator
        data={stakeholdersResponse.data}
        loading={stakeholdersResponse.loading}
        error={stakeholdersResponse.error}
      />
    );
  }   
  
  return (
    <React.Fragment>
      <DetailsList
        items={listItems}
        columns={columns}
        groups={groups}
        selectionMode={SelectionMode.none}
        isHeaderVisible={true}
        groupProps={{
          showEmptyGroups: true,
          onRenderHeader: onRenderGroupHeader
        }}
      />

      <Panel
        isOpen={panelIsOpen}
        closeButtonAriaLabel="Close"
        isHiddenOnDismiss={true}
        headerText={t("panel.header")}
        onDismiss={dismissPanel}
        isBlocking={false}
        isFooterAtBottom={false}
        //onRenderFooterContent={onRenderFooterContent}
      >
        <AddStakehoderPanelContent dismissPanel={dismissPanel} />
      </Panel>
    </React.Fragment>
  );

  

}


