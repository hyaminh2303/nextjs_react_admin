import {
  GET_PILOTS,
  GET_PILOT,
} from './graphql/pilots/queries';
import {
  CREATE_PILOT,
  UPDATE_PILOT,
  DELETE_PILOTS,
  DELETE_PILOT,
} from './graphql/pilots/mutations';

const pilotProvider = (client: any) => ({
  getList: async (params: any) => {
    const { data } = await client.query({ query: GET_PILOTS });
    return { data: data.pilots, total: data.pilots.length };
  },
  getMany: async (params: any) => {
    const { data } = await client.query({ query: GET_PILOTS, variables: { ids: params.ids } });
    return { data: data.pilots };
  },
  create: async (params: any) => {
    const { data } = await client.mutate({ mutation: CREATE_PILOT, variables: params.data, refetchQueries: [{ query: GET_PILOTS }] });
    await client.query({ query: GET_PILOTS });
    return { data: data.createPilot };
  },
  update: async (params: any) => {
    const { data } = await client.mutate({ mutation: UPDATE_PILOT, variables: params.data });
    return { data: data.updatePilot };
  },
  delete: async (params: any) => {
    const { data } = await client.mutate({
      mutation: DELETE_PILOT,
      variables: { id: params.id },
      refetchQueries: [{ query: GET_PILOTS }],
    });

    return { data: data.deletePilot.id };
  },
  deleteMany: async (params: any) => {
    const { data } = await client.mutate({
      mutation: DELETE_PILOTS,
      variables: { ids: params.ids },
      refetchQueries: [{ query: GET_PILOTS }],
    });

    const deletedIds = params.ids;
    return { data: deletedIds };
  },
  getOne: async (params: any) => {
    const { data } = await client.query({ query: GET_PILOT, variables: { id: params.id } });
    return { data: data.pilot };
  },
});

export default pilotProvider;
