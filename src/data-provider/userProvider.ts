import {
  GET_USERS,
  GET_USER,
} from './graphql/users/queries';
import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USERS,
  DELETE_USER,
} from './graphql/users/mutations';

const userProvider = (client: any) => ({
  getList: async (params: any) => {
    const { data } = await client.query({ query: GET_USERS });
    return { data: data.users, total: data.users.length };
  },
  create: async (params: any) => {
    const { data } = await client.mutate({ mutation: CREATE_USER, variables: params.data });
    return { data: data.createUser };
  },
  update: async (params: any) => {
    const { data } = await client.mutate({ mutation: UPDATE_USER, variables: params.data });
    return { data: data.updateUser };
  },
  delete: async (params: any) => {
    const { data } = await client.mutate({ mutation: DELETE_USER, variables: { id: params.id } });
    return { data: data.deleteUser.id };
  },
  deleteMany: async (params: any) => {
    const { data } = await client.mutate({ mutation: DELETE_USERS, variables: { ids: params.ids } });
    return { data: data.deleteUsers.deletedIds };
  },
  getOne: async (params: any) => {
    const { data } = await client.query({ query: GET_USER, variables: { id: params.id } });
    return { data: { ...data.user } };
  },
});

export default userProvider;