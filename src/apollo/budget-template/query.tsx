import { gql } from "@apollo/client";


export const GET_BUDGET_TEMPLATE = gql`
    query GET_BUDGET_TEMPLATE {
        budgetTemplates{
            id
            item
            itemDescription
            itemName
            measureUnitId
            methodologyId
            subtotal
            permanent
            createdAt
            updatedAt
        }
    }
`;

//---- ADD_NEW_BUDGET_TEMPLATE--------------------------------------------------------------
export const ADD_NEW_BUDGET_TEMPLATE = gql`
    mutation CreateBudgetTemplatePayload($input: CreateBudgetTemplateInput!){
        createBudgetTemplate(input: $input){
        budgetTemplate{
            id
            item
            itemDescription
            itemName
            measureUnitId
            methodologyId
            subtotal
            permanent
            createdAt
            updatedAt
        }
        }
    }
`;

//---- DELETE_BUDGET_TEMPLATE--------------------------------------------------------------
export const DELETE_BUDGET_TEMPLATE = gql`
    mutation deleteBudgetTemplate ($input: DeleteBudgetTemplateInput!){
        deleteBudgetTemplate(input: $input){
            budgetTemplate{
                id
                item
                itemDescription
                itemName
                measureUnitId
                methodologyId
                subtotal
                permanent
                createdAt
                updatedAt
            }
        }
    }
`;

//---- DELETE_BUDGET_TEMPLATE--------------------------------------------------------------
export const UPDATE_BUDGET_TEMPLATE = gql`
    mutation updateBudgetTemplate($input: UpdateBudgetTemplateInput!){
        updateBudgetTemplate(input: $input){
        budgetTemplate{
                id
                item
                itemDescription
                itemName
                measureUnitId
                methodologyId
                subtotal
                permanent
                createdAt
                updatedAt
            }
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
