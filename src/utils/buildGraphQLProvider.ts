import { ApolloClient } from "@apollo/client";
import {
  aircraftProvider,
  userProvider,
} from "../data-provider";

const resourceProviders: { [key: string]: (client: ApolloClient<any>) => any } = {
  aircrafts: aircraftProvider,
  users: userProvider,
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
      const data = await provider.deleteMany(params);
      return data;
    },
    getOne: async (resource: any, params: any) => {
      const provider = getProvider(resource, client);
      const data = await provider.getOne(params);
      return data;
    },
  };
};

export default buildGraphQLProvider;
