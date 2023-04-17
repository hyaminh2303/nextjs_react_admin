import React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import buildGraphQLProvider from "../utils/dataProvider";
import { AircraftCreate } from '../components/aircrafts/create';
import { AircraftEdit } from '../components/aircrafts/edit';
import { AircraftList } from '../components/aircrafts/list';
import LoginPage from "./sessions/login";
import authProvider from './sessions/authProvider';
import './sessions/amplify-config';


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
