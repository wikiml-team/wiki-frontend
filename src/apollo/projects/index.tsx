import { gql } from '@apollo/client'

export const GET_PROJECTS = gql`{
    projects {
        id
        shortName
        largeName
    }
}`
export const buildQueryMethodologies = (fields?: string[]) => {
    const f = fields?.filter(f => f !== "name" && f !== "id")

    return gql`{
    methodologies {
      id, name, ${fields?.toString()}
    }
  }`
}