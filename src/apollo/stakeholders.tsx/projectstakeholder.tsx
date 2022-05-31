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

