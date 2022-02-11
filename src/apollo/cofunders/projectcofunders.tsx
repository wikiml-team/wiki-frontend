import { gql } from "@apollo/client";

export const GET_COFUNDERS_BY_PROJECTID = gql`
  query GetCofundersByProjectId($id: ID!) {
    project(id: $id) {
      coFunders {
        id
        projectStakeholder {
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
  }
`;
