import * as React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

const UserEdit: React.FC = (props) => (
  <Edit {...props}>
    <SimpleForm>
    </SimpleForm>
  </Edit>
);

export default UserEdit;