import React from "react";
import { Admin, Resource, CustomRoutes, Edit } from "react-admin";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
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
import CustomLayout from '../components/CustomLayout';
import SettingsForm from './settings/settings-form';
import { Route } from 'react-router-dom';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
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
    <Admin
      loginPage={LoginPage}
      dataProvider={dataProvider}
      authProvider={authProvider}
      layout={CustomLayout}
    >
      <Resource name="aircrafts" icon={AirplanemodeActiveIcon} list={AircraftList} create={AircraftCreate} edit={AircraftEdit} />
      <Resource name="users" icon={UserIcon} list={UserList} create={UserCreate} edit={UserEdit} />
      <CustomRoutes>
        <Route path="/settings" element={<SettingsForm />} />
      </CustomRoutes>
    </Admin>
  </ApolloProvider>
);

export default App;
