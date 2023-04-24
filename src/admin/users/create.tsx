import * as React from 'react';
import { Create, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

const UserCreate: React.FC = (props) => (
  <Create {...props}>
    <SimpleForm>
    </SimpleForm>
  </Create>
);

export default UserCreate;