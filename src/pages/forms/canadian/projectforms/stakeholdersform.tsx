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
import { CREATE_PROJECT_STAKEHOLDER, DELETE_PROJECT_STAKEHOLDER, GET_PROJECT_STAKEHOLDER, GET_PROYECT_STAKEHOLDERS, GET_STAKEHOLDERS, GET_STAKEHOLDERS_CATEGORIES, UPDATE_PROJECT_STAKEHOLDER } from "apollo/stakeholders/projectstakeholder";
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

  let [items, setItems] = useState<IStakholderInfo[]>([]);
  let listItems: IStakholderInfo[] = []
  
  let options: IDropdownOption[] = []

  const [panelIsOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  // DATA----------------------------------------------------------------------------------------------------------------------------
  let stakeholdersCategoriesResponse  = useQuery(GET_STAKEHOLDERS_CATEGORIES);
  let projectStakeholdersResponse     = useQuery(GET_PROYECT_STAKEHOLDERS);
  let stakeholdersResponse            = useQuery(GET_STAKEHOLDERS);
  let getStakeholderResponse          = useQuery(GET_PROJECT_STAKEHOLDER);
  const countriesData                 = require('models/countries.json');

  let [currentProjectStakeHolder, setCurrentProjectStakeHolder] = useState<IStakholderInfo>();

  //Mutations------------------------------------------------------------------------------------------------------------------------
  const [createProjectStakeholder, mutationCreateProjectStakeholder] = useMutation(CREATE_PROJECT_STAKEHOLDER)
  const [updateProjectStakeholder, mutationUpdateProjectStakeholder] = useMutation(UPDATE_PROJECT_STAKEHOLDER)
  const [deleteProjectStakeholder, mutationDeleteProjectStakeholder] = useMutation(DELETE_PROJECT_STAKEHOLDER)

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
  const handleAddStakeholder = (item: number) => {
    let projectStakeHolders: number[] = []

    stakeholdersCategoriesResponse.data.stakeholderCategories.map((current: any) => {
      if (Number(current.id) === Number(item)){
        projectStakeholdersResponse.data.projectStakeholders.map((currentStakeholder: any) => {
          if (Number(currentStakeholder.projectId) === Number(projectId) && Number(currentStakeholder.stakeholderCategoryId) === Number(current.id)){
            projectStakeHolders.push(currentStakeholder.stakeholder.id)
          }
        })
      }
    });

    for (let i=0; i<stakeholdersResponse.data.stakeholders.length; i++){
      if (!projectStakeHolders.includes(stakeholdersResponse.data.stakeholders[i].id)){
        let inputStakeholder = {
          main: false,
          stakeholderCategoryId: Number(item),
          projectId: Number(projectId),
          stakeholderId: Number(stakeholdersResponse.data.stakeholders[i].id)
        } 

        createProjectStakeholder({
          variables: { input: inputStakeholder },
          refetchQueries: [{ query: GET_STAKEHOLDERS_CATEGORIES }, { query: GET_PROYECT_STAKEHOLDERS }, { query: GET_STAKEHOLDERS }]
        })
        break
      }
    }

    getDetail()
  };

  const handleDeleteStakeholder = (item: IStakholderInfo) => {
    let inputStakeholder = {
      id: item.idProjectStakeHolder
    }

    deleteProjectStakeholder({
      variables: { inputDeleteProjectStakeholder: inputStakeholder },
      refetchQueries: [{ query: GET_STAKEHOLDERS_CATEGORIES }, { query: GET_PROYECT_STAKEHOLDERS }, { query: GET_STAKEHOLDERS }]
    })

    getDetail()
  };

  const handleChangeMainStakeholder = (item: IStakholderInfo) => {
    projectStakeholdersResponse.data.projectStakeholders.map((currentStakeholder: any) => {
      if (Number(currentStakeholder.projectId) === Number(projectId) && Number(currentStakeholder.stakeholderCategoryId) === Number(item.category)){
        if (Number(item.idProjectStakeHolder) === Number(currentStakeholder.id)){
          let currentProjectStakeholderMain = {
            id: Number(item.idProjectStakeHolder),
            main: true,
            stakeholderCategoryId: Number(item.category),
            projectId: Number(projectId),
            stakeholderId: Number(item.id)
          }

          updateProjectStakeholder({
            variables: { updateProjectStakeholder: currentProjectStakeholderMain },
            refetchQueries: [{ query: GET_STAKEHOLDERS_CATEGORIES }, { query: GET_PROYECT_STAKEHOLDERS }, { query: GET_STAKEHOLDERS }]
          })
        }
      }
    })
  };

  const changeStakeHolder = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
    if (option?.key){
      let projectStakeHolders: number[] = []

      stakeholdersCategoriesResponse.data.stakeholderCategories.map((current: any) => {
        if (Number(current.id) === Number(option?.data?.category)){
          projectStakeholdersResponse.data.projectStakeholders.map((currentStakeholder: any) => {
            if (Number(currentStakeholder.projectId) === Number(projectId) && Number(currentStakeholder.stakeholderCategoryId) === Number(current.id)){
              projectStakeHolders.push(currentStakeholder.stakeholder.id)
            }
          })
        }
      });

      if (!projectStakeHolders.includes(Number(option?.key)) && Number(option?.key) !== Number(0)){

        let currentProjectStakeholder = {
          id: Number(option?.data?.idProjectStakeHolder),
          main: option?.data?.main,
          stakeholderCategoryId: Number(option?.data?.category),
          projectId: Number(projectId),
          stakeholderId: Number(option?.key)
        }

        updateProjectStakeholder({
          variables: { updateProjectStakeholder: currentProjectStakeholder },
          refetchQueries: [{ query: GET_STAKEHOLDERS_CATEGORIES }, { query: GET_PROYECT_STAKEHOLDERS }, { query: GET_STAKEHOLDERS }]
        })
      }
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

  const handleClick = (event: any, param: IStakholderInfo) => {
    setCurrentProjectStakeHolder(param)
    openPanel()
  };


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

    //setting the stakeholders options 
    let currentOptions: IDropdownOption[] = []

    currentOptions.push(
      { key: 0, text: '--None--', data: null }
    )
    stakeholdersResponse.data.stakeholders.map((currentStakeholder: any) => {
      currentOptions.push(
        { key: currentStakeholder.id, text: currentStakeholder.name, data: item }
      )
    })

    return (
      <Stack horizontal styles={{ root: { minWidth: 800 } }}>
        <Dropdown
          placeholder={t("select-placeholder")}
          defaultSelectedKey={item.id}
          options={currentOptions}
          styles={dropdownStyles}
          onChange={changeStakeHolder}
        />

        <TooltipHost content={t(`tooltip.add-stakeholder-DB`)}>
          <IconButton
            iconProps={{ iconName: "AddFriend" }}
            styles={commandStyles}
            onClick={event => handleClick(event, item)}
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
          <TooltipHost content={props.group!.data.category.description} >
            <IconButton
              iconProps={{ iconName: "SurveyQuestions" }}
              styles={bossIconStyles}
            />
          </TooltipHost>
          
          <IconButton
            iconProps={{ iconName: "Add" }}
            styles={commandStyles}
            onClick={() => handleAddStakeholder(props.group!.data.category.id)}
          />
        </React.Fragment>
      );
    }
    return null;
  };

  function getDetail(){
    if (stakeholdersCategoriesResponse.data && projectStakeholdersResponse.data && stakeholdersResponse.data){
      let index = 0;

      stakeholdersCategoriesResponse.data.stakeholderCategories.map((current: any) => {
        let count = 0
        //stakeholders of current category
        projectStakeholdersResponse.data.projectStakeholders.map((currentStakeholder: any) => {
          if (Number(currentStakeholder.projectId) === Number(projectId) && Number(currentStakeholder.stakeholderCategoryId) === Number(current.id)){
            let stakholderInfo = {
              idProjectStakeHolder: currentStakeholder.id,
              id: currentStakeholder.stakeholder.id,
              name: currentStakeholder.stakeholder.name,
              category: current.id,
              main: currentStakeholder.main,
              orderInGroup: 0,
              hasSiblings: count > 0
            }
            listItems.push(stakholderInfo)
            count++
          }
        })
        //Adding category to list
        groups.push({
          key: current.id, name: current.name, startIndex: index, count:count, data: {category: current}
        })
        index += count;
      });
    }
  }

  //Initial load of the data
  useEffect(() => {
    getDetail()
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
        <AddStakehoderPanelContent dismissPanel={dismissPanel} projectStakeholder={currentProjectStakeHolder} />
      </Panel>
    </React.Fragment>
  );

  

}


