import { gql } from '@apollo/client'

export const GET_METHODOLOGIES = gql`{
    methodologies {
      id
      name
    }
}`
export const buildQueryMethodologies = (fields?: string[]) => {
  const f = fields?.filter(f => f !== "name" && f !== "id")

  return gql`{
    methodologies {
      id, name, ${f?.toString() || ''}
    }
  }`
}