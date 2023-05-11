import { gql } from '@apollo/client';

export const CREATE_AIRCRAFT = gql`
  mutation CreateAircraft($aircraftType: String!, $model: String!, $eco: String, $status: String!, $maxPassengers: Int!) {
    createAircraft(input: { aircraftType: $aircraftType, model: $model, eco: $eco, status: $status, maxPassengers: $maxPassengers }) {
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

export const UPDATE_AIRCRAFT = gql`
  mutation UpdateAircraft($id: ID!, $aircraftType: String, $model: String, $eco: String, $status: String, $maxPassengers: Int) {
    updateAircraft(input: { id: $id, aircraftType: $aircraftType, model: $model, eco: $eco, status: $status, maxPassengers: $maxPassengers }) {
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

export const DELETE_AIRCRAFT = gql`
  mutation DeleteAircraft($id: ID!) {
    deleteAircraft(input: { id: $id }) {
      id
    }
  }
`;

export const DELETE_AIRCRAFTS = gql`
  mutation DeleteAircrafts($ids: [ID!]!) {
    deleteAircrafts(input: { ids: $ids }) {
      deletedIds
    }
  }
`;
