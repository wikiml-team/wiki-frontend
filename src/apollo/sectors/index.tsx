import { gql } from "@apollo/client";

export const GET_SECTORS = gql`
  query GetSectors {
    sectors {
      id
      name
      description
      methodology {
        id
        name
      }
      projectSample
    }
  }
`;
