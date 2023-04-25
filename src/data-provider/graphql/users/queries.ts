import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query AllUsers {
    users {
      id
      email
      userType
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      userType
      createdAt
      updatedAt
    }
  }
`;