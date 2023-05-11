import * as React from 'react';
import { List, Filter, Datagrid, TextField, NumberField, DateField, EmailField, TextInput, SelectInput, ReferenceField } from 'react-admin';

const UsersFilter = (props: any) => (
  <Filter {...props}>
    <TextInput source="email" label="Search by email" alwaysOn/>
    <SelectInput source="userType" label="User Type" choices={[
      { id: 'administrator', name: 'Administrator' },
      { id: 'member', name: 'Member' },
      { id: 'pilot', name: 'Pilot' },
      { id: 'coordinator', name: 'Coordinator' },
      { id: 'service_provider', name: 'Service Provider' },
      { id: 'aircrafts_provider', name: 'Aircrafts Provider' },
    ]} />
  </Filter>
)

const UserList: React.FC = (props) => (
  <List {...props} filters={<UsersFilter />}>
    <Datagrid rowClick="edit">
      <NumberField source="id" label="ID" data-testid="id" />
      <EmailField source="email" label="Email" data-testid="email" />
      <TextField source="userType" label="User Type" data-testid="userType" />
      <DateField source="createdAt" label="Created At" data-testid="createdAt" />
      <DateField source="updatedAt" label="Updated At" data-testid="updatedAt" />
    </Datagrid>
  </List>
);

export default UserList;