import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      shortName
      largeName
      description
      languageId
      projectStatusId
      public
      methodology {
        id
        name
      }
      projectPermissions {
        id
        userId
      }
      wikimlCode
      createdAt
    }
  }
`;
