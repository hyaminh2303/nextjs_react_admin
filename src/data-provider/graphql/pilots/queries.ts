import { gql } from '@apollo/client';

export const GET_PILOTS = gql`
  query AllPilots {
    pilots {
      id
      createdAt
      updatedAt
    }
  }
`;

export const GET_PILOT = gql`
  query GetPilot($id: ID!) {
    pilot(id: $id) {
      id
      createdAt
      updatedAt
    }
  }
`;
