import { gql } from '@apollo/client'

export const GET_METHODOLOGY_BY_ID = gql`
    query Methodology($id: String!) {
    methodologies(id: $id) {
      id
      name
    }
}`

export const GET_METHODOLOGY_BY_NAME = gql`
    query Methodology($name: String!) {
    methodologies(name: $name) {
      id
      name
    }
}`

export const buildQueryMethodology = (search: string, fields? : string[]) => {
  const f = fields?.filter(f => f !== "name" && f !== "id")

  return gql`
    query Methodology($name: String!) {
      methodologies(name: $name) {
        id
        name
      }
    }`
}
