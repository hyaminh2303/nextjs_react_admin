import { buildGqlQuery, DataProvider } from 'ra-data-graphql-simple';
import { ApolloClient, DocumentNode, gql } from '@apollo/client';

const GET_AIRCRAFTS = gql`
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

const CREATE_AIRCRAFT = gql`
  mutation CreateAircraft(
    $aircraftType: String!
    $model: String!
    $eco: String
    $status: String!
    $maxPassengers: Int!
  ) {
    createAircraft(
      input: {
        aircraftType: $aircraftType
        model: $model
        eco: $eco
        status: $status
        maxPassengers: $maxPassengers
      }
    ) {
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

const UPDATE_AIRCRAFT = gql`
  mutation UpdateAircraft(
    $id: ID!
    $aircraftType: String
    $model: String
    $eco: String
    $status: String
    $maxPassengers: Int
  ) {
    updateAircraft(
      input: {
        id: $id
        aircraftType: $aircraftType
        model: $model
        eco: $eco
        status: $status
        maxPassengers: $maxPassengers
      }
    ) {
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

const DELETE_AIRCRAFTS = gql`
  mutation DeleteAircrafts($ids: [ID!]!) {
    deleteAircrafts(input: { ids: $ids }) {
      deletedIds
    }
  }
`;

const GET_AIRCRAFT = gql`
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

const customDataProvider = (client: ApolloClient<any>): DataProvider => {
  return {
    getList: async (resource, params) => {
      if (resource === 'aircrafts') {
        const { data } = await client.query({ query: GET_AIRCRAFTS });
        return { data: data.aircrafts, total: data.aircrafts.length };
      } else {
        const query = buildGqlQuery(resource, params, 'getList');
        const { data } = await client.query({ query });
        return {
          data: data[Object.keys(data)[0]],
          total: data[Object.keys(data)[0]].length,
        };
      }
    },
    create: async (resource, params) => {
      if (resource === 'aircrafts') {
        const { data } = await client.mutate({
          mutation: CREATE_AIRCRAFT,
          variables: params.data,
        });
        return { data: data.createAircraft };
      } else {
        const query = buildGqlQuery(resource, params, 'create');
        const { data } = await client.mutate({ mutation: query });
        return {
          data: data[Object.keys(data)[0]],
        };
      }
    },
    update: async (resource, params) => {
      if (resource === 'aircrafts') {
        const { data } = await client.mutate({
          mutation: UPDATE_AIRCRAFT,
          variables: params.data,
        });
        return { data: data.updateAircraft };
      } else {
        const query = buildGqlQuery(resource, params, 'update');
        const { data } = await client.mutate({ mutation: query });
        return {
          data: data[Object.keys(data)[0]],
        };
      }
    },
    delete: async (resource, params) => {
      if (resource === 'aircrafts') {
        const { data } = await client.mutate({
          mutation: DELETE_AIRCRAFT,
          variables: { id: params.id },
        });
        return { data: data.deleteAircraft };
      } else {
        const query = buildGqlQuery(resource, params, 'delete');
        const { data } = await client.mutate({ mutation: query });
        return {
          data: data[Object.keys(data)[0]],
        };
      }
    },
    deleteMany: async (resource, params) => {
      if (resource === 'aircrafts') {
        const { data } = await client.mutate({
          mutation: DELETE_AIRCRAFTS,
          variables: { ids: params.ids },
        });
        return { data: data.deleteAircrafts.deletedIds };
      } else {
        // Implement deleteMany for other resources, if needed
        throw new Error(`Unsupported resource type: ${resource}`);
      }
    },
    getOne: async (resource, params) => {
      if (resource === 'aircrafts') {
        const { data } = await client.query({
          query: GET_AIRCRAFT,
          variables: { id: params.id },
        });
        return { data: data.aircraft };
      } else {
        const query = buildGqlQuery(resource, params, 'getOne');
        const { data } = await client.query({ query: query });
        return {
          data: data[Object.keys(data)[0]],
        };
      }
    },
  };
};

export default customDataProvider;
