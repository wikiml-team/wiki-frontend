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
