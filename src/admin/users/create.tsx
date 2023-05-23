import * as React from 'react';
import { useState } from 'react';
import { Create, SimpleForm, TextInput, SelectInput, PasswordInput, SelectArrayInput } from 'react-admin';

const userTypes = [
  { id: 'admin', name: 'Administrator' },
  { id: 'member', name: 'Member' },
  { id: 'pilot', name: 'Pilot' },
]

const allUserRoles: any = {
  'admin': [
    { id: 'administrator', name: 'Administrator' },
    { id: 'coordinator', name: 'Coordinator' },
  ],
  'member': [
    { id: 'member', name: 'Member' },
  ],
  'pilot': [
    { id: 'pilot', name: 'Pilot' },
  ],
};

const UserCreate: React.FC = (props) => {
  const [userRoles, setUserRoles] = useState([]);

  const handleUserTypeChange: any = (event: React.ChangeEvent<{ value: unknown }>) => {
    const userType = event.target.value as string;
    setUserRoles(allUserRoles[userType]);
  }

  return(
    <Create {...props}>
      <SimpleForm>
        <SelectInput source="userType" label="User Type" choices={userTypes} onChange={handleUserTypeChange} />
        <SelectArrayInput source="userRoles" label="User Roles" choices={userRoles} />
        <TextInput source="email" label="Email" />
        <PasswordInput source="password" label="Password" />
      </SimpleForm>
    </Create>
  );
};

export default UserCreate;
