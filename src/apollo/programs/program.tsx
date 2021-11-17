import { gql } from "@apollo/client";

export const GET_PROGRAM_BY_ID = gql`
  query GetProgramById($id: ID!) {
    program(id: $id) {
      id
      name
    }
  }
`;
