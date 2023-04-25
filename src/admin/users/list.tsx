import * as React from 'react';
import { List, Datagrid, TextField, NumberField, DateField, EmailField } from 'react-admin';

const UserList: React.FC = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <NumberField source="id" label="ID" />
      <EmailField source="email" label="Email" />
      <TextField source="userType" label="User Type" />
      <TextField source="roles" label="Roles" />
      <DateField source="createdAt" label="Created At" />
      <DateField source="updatedAt" label="Updated At" />
    </Datagrid>
  </List>
);

export default UserList;