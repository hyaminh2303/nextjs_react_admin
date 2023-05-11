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
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const variables = {
      first: perPage,
      skip: (page - 1) * perPage,
      orderBy: `${field}_${order}`,
      email: params.filter.email,
      userType: params.filter.userType,
      createdAt: params.filter.createdAt,
    };

    const { data } = await client.query({ query: GET_USERS, variables });
    return { data: data.users, total: data.users.length };
  },
  create: async (params: any) => {
    const { data } = await client.mutate({ mutation: CREATE_USER, variables: {...params.data}, refetchQueries: [{ query: GET_USERS }] });
    await client.query({ query: GET_USERS });
    return { data: data.createUser };
  },
  update: async (params: any) => {
    const { data } = await client.mutate({ mutation: UPDATE_USER, variables: params.data });
    return { data: data.updateUser };
  },
  delete: async (params: any) => {
    const { data } = await client.mutate({
      mutation: DELETE_USER,
      variables: { id: params.id },
      refetchQueries: [{ query: GET_USERS }],
    });

    return { data: data.deleteUser.id };
  },
  deleteMany: async (params: any) => {
    const { data } = await client.mutate({
      mutation: DELETE_USERS,
      variables: { ids: params.ids },
      refetchQueries: [{ query: GET_USERS }],
    });

    const deletedIds = params.ids;
    return { data: deletedIds };
  },
  getOne: async (params: any) => {
    const { data } = await client.query({ query: GET_USER, variables: { id: params.id } });
    return { data: { ...data.user } };
  },
});

export default userProvider;
