import { gql } from '@apollo/client';

export const UPDATE_SETTINGS = gql`
  mutation UpdateSettings($id: ID!) {
    updateSettings(input: { id: $id }) {
      id
      createdAt
      updatedAt
    }
  }
`;
