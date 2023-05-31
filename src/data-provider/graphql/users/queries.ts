import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getUsers($first: Int, $skip: Int, $orderBy: String, $email: String, $phoneNumber: String, $userType: String, $createdAt: String) {
  adminUsers(first: $first, skip: $skip, orderBy: $orderBy, email: $email, phoneNumber: $phoneNumber, userType: $userType, createdAt: $createdAt) {
      id
      email
      userType
      userRoles
      phoneNumber
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    adminUser(id: $id) {
      id
      email
      userType
      userRoles
      phoneNumber
      createdAt
      updatedAt
    }
  }
`;
