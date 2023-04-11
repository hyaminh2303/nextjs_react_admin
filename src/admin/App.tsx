import React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import buildGraphQLProvider from "../dataProvider";
import { AircraftCreate } from './aircrafts/create';
import { AircraftEdit } from './aircrafts/edit';
import { AircraftList } from './aircrafts/list';

const client = new ApolloClient({
  uri: "http://cloud.sazae-technology.com:3000/graphql",
  cache: new InMemoryCache(),
});

const dataProvider = buildGraphQLProvider(client);

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <Admin dataProvider={dataProvider}>
      <Resource name="aircrafts" list={AircraftList} create={AircraftCreate} edit={AircraftEdit} />
    </Admin>
  </ApolloProvider>
);

export default App;
