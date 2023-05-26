import * as React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';

const PilotEdit: React.FC = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" label="Title" />
      <TextInput source="certifications" label="Certifications" />
      <NumberInput source="flightHours" label="Flight Hours" />
    </SimpleForm>
  </Edit>
);

export default PilotEdit;
