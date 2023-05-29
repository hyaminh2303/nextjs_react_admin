import {
  GET_AIRCRAFTS,
  GET_AIRCRAFT,
} from './graphql/aircrafts/queries';
import {
  CREATE_AIRCRAFT,
  UPDATE_AIRCRAFT,
  DELETE_AIRCRAFTS,
  DELETE_AIRCRAFT,
} from './graphql/aircrafts/mutations';

const aircraftProvider = (client: any) => ({
  getList: async (params: any) => {
    const { data } = await client.query({ query: GET_AIRCRAFTS });
    return { data: data.adminAircrafts, total: data.adminAircrafts.length };
  },
  getMany: async (params: any) => {
    const { data } = await client.query({ query: GET_AIRCRAFTS, variables: { ids: params.ids } });
    return { data: data.adminAircrafts };
  },
  create: async (params: any) => {
    const { data } = await client.mutate({ mutation: CREATE_AIRCRAFT, variables: params.data, refetchQueries: [{ query: GET_AIRCRAFTS }] });
    await client.query({ query: GET_AIRCRAFTS });
    return { data: data.adminCreateAircraft };
  },
  update: async (params: any) => {
    const { data } = await client.mutate({ mutation: UPDATE_AIRCRAFT, variables: params.data });
    return { data: data.adminUpdateAircraft };
  },
  delete: async (params: any) => {
    const { data } = await client.mutate({
      mutation: DELETE_AIRCRAFT,
      variables: { id: params.id },
      refetchQueries: [{ query: GET_AIRCRAFTS }],
    });

    return { data: data.adminDeleteAircraft.id };
  },
  deleteMany: async (params: any) => {
    const { data } = await client.mutate({
      mutation: DELETE_AIRCRAFTS,
      variables: { ids: params.ids },
      refetchQueries: [{ query: GET_AIRCRAFTS }],
    });

    const deletedIds = params.ids;
    return { data: deletedIds };
  },
  getOne: async (params: any) => {
    const { data } = await client.query({ query: GET_AIRCRAFT, variables: { id: params.id } });
    return { data: data.adminAircraft };
  },
});

export default aircraftProvider;
