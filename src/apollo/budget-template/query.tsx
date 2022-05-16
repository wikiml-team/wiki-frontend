import { gql } from "@apollo/client";

 //---- RETURNS THE LIST OF BUDGET_TEMPLATES--------------------------------------------------------------
export const GET_BUDGET_TEMPLATE = gql`
    query GET_BUDGET_TEMPLATE($id: ID!) {
        methodology(id: $id) {
            budgetTemplates {
                id
                item
                itemDescription
                itemName
                measureUnitId
                methodologyId
                permanent
                budgetItemTypeId
                formula
            }
        }
    }
`;


//---- ADD_NEW_BUDGET_TEMPLATE--------------------------------------------------------------
export const ADD_NEW_BUDGET_TEMPLATE = gql`
    mutation createBudgetTemplate($input: CreateBudgetTemplateInput!){
        createBudgetTemplate(input: $input){
            budgetTemplate{
                item
            }
        }
    }
`;

//---- DELETE_BUDGET_TEMPLATE--------------------------------------------------------------
export const DELETE_BUDGET_TEMPLATE = gql`
    mutation deleteBudgetTemplate ($input: DeleteBudgetTemplateInput!){
        deleteBudgetTemplate(input: $input){
            budgetTemplate {
                id
            }
        }
    }
`;

//---- DELETE_BUDGET_TEMPLATE--------------------------------------------------------------
export const UPDATE_BUDGET_TEMPLATE = gql`
    mutation updateBudgetTemplate($input: UpdateBudgetTemplateInput!){
        updateBudgetTemplate(input: $input){
            budgetTemplate {
                id
                item
                itemDescription
                itemName
                measureUnitId
                methodologyId
                permanent
                createdAt
                updatedAt
      			formula
            }
        }
    }
`;

 //---- RETURNS THE LIST OF BUDGET TEMPLATES TYPES---------------------------------------------------------
export const GET_BUDGET_TYPES = gql`
    query GET_BUDGET_TYPES {
        budgetItemTypes{
            id
            name
        }
    }
`;

/* ADD ITEM EXAMPLE
let itemNew = {
    "item": "ITEM",
    "itemDescription": "item new description",
    "itemName": "item new name",
    "measureUnitId": 1,
    "methodologyId": 1,
    "subtotal": false,
    "permanent": false
  }
*/
