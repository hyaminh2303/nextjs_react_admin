import * as React from 'react';
import { Create, SimpleForm, TextInput, SelectInput, PasswordInput } from 'react-admin';

const userTypes = [
  { id: 'admin', name: 'Admin' },
  { id: 'member', name: 'Member' },
  { id: 'pilot', name: 'Pilot' },
]

const UserCreate: React.FC = (props) => (
  <Create {...props}>
    <SimpleForm>
      <SelectInput source="userType" label="User Type" choices={userTypes} />
      <TextInput source="email" label="Email" />
      <PasswordInput source="password" label="Password" />
    </SimpleForm>
  </Create>
);

export default UserCreate;