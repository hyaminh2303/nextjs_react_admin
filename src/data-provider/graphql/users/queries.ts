import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query AllUsers {
    users {
      id
      createdAt
      updatedAt
    }
  }
`;

// export const GET_USER = gql`
//   query GetUser($id: ID!) {
//     user(id: $id) {
//       id
//       createdAt
//       updatedAt
//     }
//   }
// `;