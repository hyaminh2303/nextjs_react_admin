import * as React from 'react';
import { useState } from 'react';
import { Create, SimpleForm, TextInput, SelectInput, PasswordInput, SelectArrayInput } from 'react-admin';

const userTypes = [
  { id: 'admin', name: 'Administrator' },
  { id: 'provider', name: 'Provider' },
  { id: 'customer', name: 'Customer' },
  { id: 'pilot', name: 'Pilot' },
]

const allUserRoles: any = {
  'admin': [
    { id: 'administrator', name: 'Administrator' },
    { id: 'coordinator', name: 'Coordinator' },
  ],
  'provider': [
    { id: 'aircraft_provider', name: 'Aircraft Provider' },
    { id: 'service_provider', name: 'Service Provider' },
  ],
  'pilot': [],
  'customer': [],
};

const UserCreate: React.FC = (props) => {
  const [userRoles, setUserRoles] = useState([]);
  const [userType, setUserType] = useState('');

  const handleUserTypeChange: any = (event: React.ChangeEvent<{ value: unknown }>) => {
    const type = event.target.value as string;
    setUserType(type);
    setUserRoles(allUserRoles[type]);
  }
  return(
    <Create {...props}>
      <SimpleForm>
        <SelectInput source="userType" label="User Type" choices={userTypes} onChange={handleUserTypeChange} />
        {
            (userType == 'admin' || userType == 'provider') &&
              <SelectArrayInput source="userRoles" label="User Roles" choices={userRoles} />
          }
        <TextInput source="email" label="Email" />
        <PasswordInput source="password" label="Password" />
      </SimpleForm>
    </Create>
  );
};

export default UserCreate;
