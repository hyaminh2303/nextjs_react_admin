import * as React from 'react';
import { useState, useEffect } from 'react';

import { Edit, SimpleForm, TextInput, SelectInput, PasswordInput, ArrayInput, SelectArrayInput, SimpleFormIterator } from 'react-admin';

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

const UserEdit: React.FC = (props: any, aaa) => {
  const [userRoles, setUserRoles] = useState([]);

  const handleUserTypeChange: any = (event: React.ChangeEvent<{ value: unknown }>) => {
    const userType = event.target.value as string;
    setUserRoles(allUserRoles[userType]);
  }

  console.log(props)
  console.log(aaa)

  useEffect(() => {
    if (props.record && props.record.userType) {
      setUserRoles(allUserRoles[props.record.userType]);
    }
  }, [props.record]);

  // if (!props.record) {
  //   return <div>Loading...</div>;
  // }

  return(
    <Edit {...props}>
      <SimpleForm>
        <SelectInput source="userType" label="User Type" choices={userTypes} id='userType' onChange={handleUserTypeChange} />
        <SelectArrayInput source="userRoles" label="User Roles" choices={userRoles} />
        <TextInput source="email" label="Email" />
        <PasswordInput source="password" label="Password" />
      </SimpleForm>
    </Edit>
  )
};

export default UserEdit;
