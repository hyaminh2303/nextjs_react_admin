import * as React from 'react';
import { Create, SimpleForm, TextInput, SelectInput, PasswordInput } from 'react-admin';

const userTypes = [
  { id: 'administrator', name: 'Administrator' },
  { id: 'member', name: 'Member' },
  { id: 'pilot', name: 'Pilot' },
  { id: 'coordinator', name: 'Coordinator' },
  { id: 'service_provider', name: 'Service Provider' },
  { id: 'aircrafts_provider', name: 'Aircrafts Provider' },
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
