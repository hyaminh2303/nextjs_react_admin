import * as React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

const userTypes = [
  { id: 'admin', name: 'Admin' },
  { id: 'user', name: 'User' },
  { id: 'pilot', name: 'Pilot' },
]

const UserEdit: React.FC = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <SelectInput source="userType" label="User Type" choices={userTypes} />
      <TextInput source="email" label="Email" />
    </SimpleForm>
  </Edit>
);

export default UserEdit;