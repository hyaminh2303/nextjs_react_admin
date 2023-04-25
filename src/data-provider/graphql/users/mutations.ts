import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($id: String!, $email: String!) {
    createUser(input: { email: $email }) {
      id
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!) {
    updateUser(input: { id: $id }) {
      id
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
