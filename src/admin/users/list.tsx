import * as React from 'react';
import { List, Datagrid, TextField, NumberField, DateField } from 'react-admin';

const UserList: React.FC = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
    </Datagrid>
  </List>
);

export default UserList;