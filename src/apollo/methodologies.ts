import { gql } from '@apollo/client'

export const GET_METHODOLOGIES = gql`{
    methodologies {
      id
      name
    }
}`

// export const GET_USER_PROJECTS = gql`
//   query UserProjects($breed: String!) {
//     projects(breed: $breed) {
//       id
//       name
//       methodology: {
//         name
//       }
//     }
//   }
// `;