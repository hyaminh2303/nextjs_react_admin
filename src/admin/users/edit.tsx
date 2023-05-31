  import * as React from 'react';
  import { useState, useEffect } from 'react';

  import { Edit, SimpleForm, TextInput, SelectInput, PasswordInput, ArrayInput, SelectArrayInput, SimpleFormIterator, useEditController } from 'react-admin';

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

  const UserEdit: React.FC = (props: any) => {
    const { record } = useEditController(props);
    const [userRoles, setUserRoles] = useState([]);
    const [userType, setUserType] = useState('');

    const handleUserTypeChange: any = (event: React.ChangeEvent<{ value: unknown }>) => {
      const type = event.target.value as string;
      setUserType(type);
      setUserRoles(allUserRoles[type]);
    }

    useEffect(() => {
      if (record && record.userType) {
        setUserType(record.userType);
        setUserRoles(allUserRoles[record.userType]);
      }
    }, [record]);

    return(
      <Edit {...props}>
        <SimpleForm>
          <SelectInput source="userType" label="User Type" choices={userTypes} id='userType' onChange={handleUserTypeChange} />

          {
            (userType == 'admin' || userType == 'provider') &&
              <SelectArrayInput source="userRoles" label="User Roles" choices={userRoles} />
          }
          <TextInput source="email" label="Email" />
          <TextInput source="phoneNumber" label="Phone Number" />
          <PasswordInput source="password" label="Password" />
        </SimpleForm>
      </Edit>
    )
  };

  export default UserEdit;
