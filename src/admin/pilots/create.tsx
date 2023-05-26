import * as React from 'react';
import { Create, SimpleForm, TextInput, NumberInput } from 'react-admin';

const PilotCreate: React.FC = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" label="Title" />
      <TextInput source="certifications" label="Certifications" />
      <NumberInput source="flightHours" label="Flight Hours" />
    </SimpleForm>
  </Create>
);

export default PilotCreate;
