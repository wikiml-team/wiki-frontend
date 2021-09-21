import { gql } from '@apollo/client'

export const GET_METHODOLOGIES = gql`{
      methodologies {
        id
        name
      }
    }`