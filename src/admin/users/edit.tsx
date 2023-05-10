import * as React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, SelectInput, PasswordInput } from 'react-admin';

const userTypes = [
  { id: 'administrator', name: 'Administrator' },
  { id: 'member', name: 'Member' },
  { id: 'pilot', name: 'Pilot' },
  { id: 'coordinator', name: 'Coordinator' },
  { id: 'service_provider', name: 'Service Provider' },
  { id: 'aircrafts_provider', name: 'Aircrafts Provider' },
]

const UserEdit: React.FC = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <SelectInput source="userType" label="User Type" choices={userTypes} id='userType' />
      <TextInput source="email" label="Email" />
      <PasswordInput source="password" label="Password" />
    </SimpleForm>
  </Edit>
);

export default UserEdit;