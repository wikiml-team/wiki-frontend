import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      shortName
      largeName
      description
      languageId
      programId
      projectStatusId
      public
      sectorId
      currencyCode
      durationPlan
      methodology {
        id
        name
      }
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
