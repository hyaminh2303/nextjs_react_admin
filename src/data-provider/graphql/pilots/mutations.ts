import { gql } from '@apollo/client';

export const CREATE_PILOT = gql`
  mutation CreatePilot() {
    createPilot(input: { }) {
      id
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PILOT = gql`
  mutation UpdatePilot($id: ID!) {
    updatePilot(input: { id: $id }) {
      id
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_PILOT = gql`
  mutation DeletePilot($id: ID!) {
    deletePilot(input: { id: $id }) {
      id
    }
  }
`;

export const DELETE_PILOTS = gql`
  mutation DeletePilots($ids: [ID!]!) {
    deletePilots(input: { ids: $ids }) {
      deletedIds
    }
  }
`;
