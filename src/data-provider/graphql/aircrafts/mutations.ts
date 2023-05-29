import { gql } from '@apollo/client';

export const CREATE_AIRCRAFT = gql`
  mutation CreateAircraft($aircraftType: String!, $model: String!, $eco: String, $status: String!, $maxPassengers: Int!) {
    adminCreateAircraft(input: { aircraftType: $aircraftType, model: $model, eco: $eco, status: $status, maxPassengers: $maxPassengers }) {
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
    adminUpdateAircraft(input: { id: $id, aircraftType: $aircraftType, model: $model, eco: $eco, status: $status, maxPassengers: $maxPassengers }) {
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
    adminDeleteAircraft(input: { id: $id }) {
      id
    }
  }
`;

export const DELETE_AIRCRAFTS = gql`
  mutation DeleteAircrafts($ids: [ID!]!) {
    adminDeleteAircrafts(input: { ids: $ids }) {
      deletedIds
    }
  }
`;
