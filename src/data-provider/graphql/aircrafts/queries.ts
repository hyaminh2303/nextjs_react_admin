import { gql } from '@apollo/client';

export const GET_AIRCRAFTS = gql`
  query AllAircrafts {
    aircrafts {
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
    aircraft(id: $id) {
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