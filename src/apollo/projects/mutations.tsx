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

//---- UPDATE_PROJECT--------------------------------------------------------------
export const UPDATE_PROJECT = gql`
  mutation updateProject($inputProjectUpdate: UpdateProjectInput!){
    updateProject(input: $inputProjectUpdate){
        project {
          id
          largeName
        }
    }
  }
`;

//---- UPDATE_PROJECT_APPROVED--------------------------------------------------------------
export const UPDATE_PROJECT_APPROVED = gql`
  mutation updateApprovedProject($inputUpdateApprovedProject: UpdateApprovedProjectInput!){
    updateApprovedProject(input: $inputUpdateApprovedProject){
        approvedProject{
            id
            approvedBudget
            approvedDate
            createdAt
            donorAssignedCode
            planFinalDate
            planInitialDate
            projectId
            updatedAt
        }
    }
  }
`;

//---- UPDATE_PROJECT_APPROVED--------------------------------------------------------------
export const CREATE_PROJECT_APPROVED = gql`
    mutation createApprovedProject($inputCreateApprovedProject: CreateApprovedProjectInput!){
      createApprovedProject(input: $inputCreateApprovedProject){
          approvedProject{
              id
              approvedBudget
              approvedDate
              createdAt
              donorAssignedCode
              planFinalDate
              planInitialDate
              projectId
              updatedAt
          }
      }
    }
`;

//---- UPDATE_PROJECT_APPROVED--------------------------------------------------------------
export const UPDATE_AID_RECIPIENT_COUNTRY = gql`
    mutation updateAidRecipientCountry($inputCreateAidRecipientCountry: UpdateAidRecipientCountryInput!){
      updateAidRecipientCountry(input: $inputCreateAidRecipientCountry){
          aidRecipientCountry {
            id
            countryCode
            mainRecipientCountry
            projectId
          }
      }
    }
`;
