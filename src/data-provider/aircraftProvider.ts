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
    return { data: data.aircrafts, total: data.aircrafts.length };
  },
  create: async (params: any) => {
    const { data } = await client.mutate({ mutation: CREATE_AIRCRAFT, variables: params.data });
    return { data: data.createAircraft };
  },
  update: async (params: any) => {
    const { data } = await client.mutate({ mutation: UPDATE_AIRCRAFT, variables: params.data });
    return { data: data.updateAircraft };
  },
  delete: async (params: any) => {
    const { data } = await client.mutate({ mutation: DELETE_AIRCRAFT, variables: { id: params.id } });
    return { data: data.deleteAircraft.id };
  },
  deleteMany: async (params: any) => {
    const { data } = await client.mutate({ mutation: DELETE_AIRCRAFTS, variables: { ids: params.ids } });
    return { data: data.deleteAircrafts.deletedIds };
  },
  getOne: async (params: any) => {
    const { data } = await client.query({ query: GET_AIRCRAFT, variables: { id: params.id } });
    return { data: data.aircraft };
  },
});

export default aircraftProvider;