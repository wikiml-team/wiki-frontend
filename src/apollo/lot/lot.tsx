import { gql } from "@apollo/client";

export const GET_BUDGET_BY_ID = gql`
  query GetBudgetById($id: ID!) {
    project_budgets(id: $id) {
      id
      item_name
    }
  }
`;
