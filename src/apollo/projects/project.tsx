import { gql } from "@apollo/client";

export const GET_PROJECT_BY_ID = gql`
  query GetProjectById($id: ID!) {
    project(id: $id) {
      id
      shortName
      largeName
      methodology {
        id
        name
      }
      description
      languageId
      programId
      projectStatusId
      projectStatus {
        name
      }
      public
      sectorId
      currencyCode
      durationPlan
      intermediateOutcomes {
        id
      }
      projectPermissions {
        id
        userId
      }
      solicitedBudget
      ultimateOutcome {
        id
        description
        what
        where
      }
      wikimlCode
      createdAt
    }
  }
`;

export const GET_APPROVED_PROJECTS = gql`
    query GET_APPROVED_PROJECTS {
      approvedProjects {
        id
        approvedBudget
        approvedDate
        createdAt
        donorAssignedCode
        planFinalDate
        planInitialDate
        projectId
        updatedAt
      }
    }
`;

export const GET_RECIPIENT_COUNTRY = gql`
    query GET_RECIPIENT_COUNTRY ($idProject: ID!){
      aidRecipientCountry(id: $idProject) {
        id
        countryCode
        mainRecipientCountry
        projectId
      }
    }
`;

export const GET_CO_FUNDER = gql`
    query CoFunder {
      coFunders {
        contribution
        currencyCode
        projectStakeholder {
          projectId
          main
          stakeholderCategoryId
        }
      }
    }
`;


