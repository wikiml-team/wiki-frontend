import { gql } from "@apollo/client";

export const GET_STAKEHOLDERS_BY_PROJECTID = gql`
  query GetStakeholdersByProjectId($id: ID!) {
    project(id: $id) {
      projectStakeholders {
        id
        main
        stakeholder {
          id
          name
        }
        stakeholderCategory {
          id
          name
        }
      }
    }
  }
`;

export const GET_PROYECT_STAKEHOLDERS = gql`
  query projectStakeholders{
    projectStakeholders {
      id
      projectId
      main
      stakeholderCategoryId
      stakeholder {
        id
        name
        countryCode
      }
    }
  }
`;

export const GET_STAKEHOLDERS_CATEGORIES = gql`
  query stakeholdersCategories{
    stakeholderCategories {
      id 
      name
      description
      methodology {
        id
      }
    }
  }
`;

export const GET_STAKEHOLDERS = gql`
  query stakeholders{
    stakeholders {
      id 
      name
    }
  }
`;

export const CREATE_PROJECT_STAKEHOLDER = gql`
  mutation createProjectStakeholder($input: CreateProjectStakeholderInput!){
    createProjectStakeholder(input: $input){
        projectStakeholder{
          id
        }
    }
  }
`;

export const GET_PROJECT_STAKEHOLDER = gql`
  query projectStakeholder {
    projectStakeholder(id: "1") {
      id
      main
      projectId
      stakeholderCategoryId
      stakeholderId
    }
  }
`;

export const CREATE_STAKEHOLDER = gql`
  mutation createStakeholder($inputCreateStakeholder: CreateStakeholderInput!){
    createStakeholder(input: $inputCreateStakeholder){
        stakeholder {
          id
          name
        }
    }
  }
`;

