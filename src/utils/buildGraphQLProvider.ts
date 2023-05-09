import { ApolloClient } from "@apollo/client";
import {
  aircraftProvider,
  userProvider,
  settingProvider
} from "../data-provider";

const resourceProviders: { [key: string]: (client: ApolloClient<any>) => any } = {
  aircrafts: aircraftProvider,
  users: userProvider,
  Settings: settingProvider
};

const getProvider = (resource: string, client: ApolloClient<any>) => {
  const provider = resourceProviders[resource];

  if (!provider) {
    throw new Error(`Unknown resource: ${resource}`);
  }

  return provider(client);
};


const buildGraphQLProvider = (client: ApolloClient<any>): any => {
  return {
    getList: async (resource: any, params: any) => {
      const provider = getProvider(resource, client);
      const data = await provider.getList(params);
      return data;
    },
    create: async (resource: any, params: any) => {
      const provider = getProvider(resource, client);
      const data = await provider.create(params);
      return data;
    },
    update: async (resource: any, params: any) => {
      const provider = getProvider(resource, client);
      const data = await provider.update(params);
      return data;
    },
    delete: async (resource: any, params: any) => {
      const provider = getProvider(resource, client);
      const data = await provider.delete(params);
      return data;
    },
    deleteMany: async (resource: any, params: any) => {
      const provider = getProvider(resource, client);
      await provider.deleteMany(params);
      const data = await provider.getList(params);
      return data;
    },
    getOne: async (resource: any, params: any) => {
      const provider = getProvider(resource, client);
      const data = await provider.getOne(params);
      return data;
    },
    getSettings: async (resource: any) => {
      const provider = getProvider(resource, client);
      const data = await provider.getSettings();
      return data;
    },
    updateSettings: async (resource: any, input: any) => {
      const provider = getProvider(resource, client);
      const data = await provider.updateSettings(input);
      return data;
    },
  };
};

export default buildGraphQLProvider;
