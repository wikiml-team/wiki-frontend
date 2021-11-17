import { gql } from "@apollo/client";

export const GET_SECTOR_BY_ID = gql`
  query GetSectorById($id: ID!) {
    sector(id: $id) {
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
