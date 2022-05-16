import { gql } from "@apollo/client";

//---- ADD_NEW_PROJECT--------------------------------------------------------------
export const ADD_NEW_PROJECT = gql`
  mutation createProject($inputProject: CreateProjectInput!){
    createProject(input: $inputProject){
        project {
          id
        }
    }
  }
`;
