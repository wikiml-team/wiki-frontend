import { gql } from "@apollo/client";

export const GET_PROGRAMS = gql`
  query GetPrograms {
    programs {
      id
      name
    }
  }
`;
