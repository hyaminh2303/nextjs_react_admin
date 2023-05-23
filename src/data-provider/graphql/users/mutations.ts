import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($userType: String!, $userRoles: [String!]!, $email: String!, $password: String!) {
    createUser(input: { userType: $userType, userRoles: $userRoles, email: $email, password: $password }) {
      id
      userType
      userRoles
      email
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $userType: String, $userRoles: [String], $email: String, $password: String) {
    updateUser(input: { id: $id, userType: $userType, userRoles: $userRoles, email: $email, password: $password }) {
      id
      userType
      userRoles
      email
      createdAt
      updatedAt
    }
  }
`;


export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(input: { id: $id }) {
      id
    }
  }
`;

export const DELETE_USERS = gql`
  mutation DeleteUsers($ids: [ID!]!) {
    deleteUsers(input: { ids: $ids }) {
      deletedIds
    }
  }
`;
