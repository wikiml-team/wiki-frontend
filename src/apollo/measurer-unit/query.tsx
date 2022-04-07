import { gql } from "@apollo/client";


export const GET_MEASURER_UNIT = gql`
    query measurerunit {
        measureUnits {
        id
        name
        description
        }
    }
`;

