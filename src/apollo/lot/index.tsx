import { gql } from "@apollo/client";

export const GET_GROUP_ACQUISITIONS = gql`
  query get_group_acquisitions($ID: ID!) {
    project(id: $ID ) {
      id
      projectBudgets{
        groupAcquisition {
          id
          lotNumber
        }
      }
    }
  }
`;


