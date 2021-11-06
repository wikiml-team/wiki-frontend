import { gql } from "@apollo/client";

export const GET_METHODOLOGIES = gql`
  query GetMethodologies {
    methodologies {
      id
      name
    }
  }
`;
