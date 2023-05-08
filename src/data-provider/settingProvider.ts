import {
  UPDATE_SETTINGS,
} from './graphql/settings/mutations';

import {GET_SETTINGS} from './graphql/settings/queries';

const settingProvider = (client: any) => ({
  update: async (params: any) => {
    const { data } = await client.mutate({ mutation: UPDATE_SETTINGS, variables: params.data });
    return { data: data.updateSettings };
  },
  getSettings: async () => {
    const { data } = await client.query({ query: GET_SETTINGS });
    console.log(data);

    return { data: data.platformConfiguration };
  },
});

export default settingProvider;