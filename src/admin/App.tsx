import React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import buildGraphQLProvider from "../dataProvider";
import { AircraftCreate } from './aircrafts/create';
import { AircraftEdit } from './aircrafts/edit';
import { AircraftList } from './aircrafts/list';
import LoginPage from "../pages/sessions/login";
import authProvider from '../pages/sessions/authProvider';
import '../pages/sessions/amplify-config';


const client = new ApolloClient({
  uri: "http://cloud.sazae-technology.com:3000/graphql",
  cache: new InMemoryCache(),
});

const dataProvider = buildGraphQLProvider(client);

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <Admin loginPage={LoginPage} dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="aircrafts" list={AircraftList} create={AircraftCreate} edit={AircraftEdit} />
    </Admin>
  </ApolloProvider>
);

export default App;
