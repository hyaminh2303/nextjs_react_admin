import * as React from 'react';
import { Create, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

const userTypes = [
  { id: 'admin', name: 'Admin' },
  { id: 'user', name: 'User' },
  { id: 'pilot', name: 'Pilot' },
]

export const UserCreate: React.FC = (props) => (
  <Create {...props}>
    <SimpleForm>
      <SelectInput source="userType" label="User Type" choices={userTypes} />
      <TextInput source="email" label="Email" />
      <TextInput source="password" label="Password" />
    </SimpleForm>
  </Create>
);
