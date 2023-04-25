import * as React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, SelectInput, PasswordInput } from 'react-admin';

const userTypes = [
  { id: 'admin', name: 'Admin' },
  { id: 'member', name: 'Member' },
  { id: 'pilot', name: 'Pilot' },
]

const UserEdit: React.FC = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <SelectInput source="userType" label="User Type" choices={userTypes} />
      <TextInput source="email" label="Email" />
      <PasswordInput source="password" label="Password" />
    </SimpleForm>
  </Edit>
);

export default UserEdit;