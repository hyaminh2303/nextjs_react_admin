import {
  UPDATE_SETTINGS,
} from './graphql/settings/mutations';

import {GET_SETTINGS} from './graphql/settings/queries';

const settingProvider = (client: any) => ({
  updateSettings: async (input: any) => {
    const { data } = await client.mutate({
      mutation: UPDATE_SETTINGS,
      variables: { input }
    });
    return { data: data.updatePlatformConfiguration.platformConfiguration };
  },
  getSettings: async () => {
    const { data } = await client.query({ query: GET_SETTINGS });
    return { data: data.platformConfiguration };
  },
});

export default settingProvider;