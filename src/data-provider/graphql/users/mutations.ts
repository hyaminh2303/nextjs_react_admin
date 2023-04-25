import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($userType: String!, $email: String!, $password: String!) {
    createUser(input: { userType: $userType, email: $email, password: $password }) {
      id
      userType
      email
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $userType: String, $email: String, $password: String) {
    updateUser(input: { id: $id, userType: $userType, email: $email, password: $password }) {
      id
      userType
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
