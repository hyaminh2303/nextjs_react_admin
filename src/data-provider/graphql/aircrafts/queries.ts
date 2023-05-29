import { gql } from '@apollo/client';

export const GET_AIRCRAFTS = gql`
  query AllAircrafts {
    adminAircrafts {
      id
      aircraftType
      model
      eco
      status
      maxPassengers
      createdAt
      updatedAt
    }
  }
`;

export const GET_AIRCRAFT = gql`
  query GetAircraft($id: ID!) {
    adminAircraft(id: $id) {
      id
      aircraftType
      model
      eco
      status
      maxPassengers
      createdAt
      updatedAt
    }
  }
`;
