import { gql } from "@apollo/client";

export const GET_METHODOLOGY_BY_ID = gql`
  query GetMethodologyById($id: ID!) {
    methodology(id: $id) {
      id
      name
    }
  }
`;

export const GET_METHODOLOGY_BY_NAME = gql`
  query GetMethodologyByName($name: String!) {
    methodology(name: $name) {
      id
      name
    }
  }
`;
