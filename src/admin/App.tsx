import React from "react";
import { Admin, Resource } from "react-admin";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";

import { Auth } from 'aws-amplify';
import { setContext } from '@apollo/client/link/context';

import buildGraphQLProvider from "../utils/buildGraphQLProvider";
import AircraftCreate from './aircrafts/create';
import AircraftEdit from './aircrafts/edit';
import AircraftList from './aircrafts/list';
import UserCreate from './users/create';
import UserEdit from './users/edit';
import UserList from './users/list';
import LoginPage from "./sessions/login";
import authProvider from '../utils/authProvider';
import '../utils/amplify-config';
import UserIcon from "@mui/icons-material/Group";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';


const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const session = await Auth.currentSession();
  const token = session.getIdToken().getJwtToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
});

const dataProvider = buildGraphQLProvider(client);

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <Admin loginPage={LoginPage} dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="aircrafts" icon={AirplanemodeActiveIcon} list={AircraftList} create={AircraftCreate} edit={AircraftEdit} />
      <Resource name="users" icon={UserIcon} list={UserList} create={UserCreate} edit={UserEdit} />
    </Admin>
  </ApolloProvider>
);

export default App;
