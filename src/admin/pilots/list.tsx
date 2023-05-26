import * as React from 'react';
import { List, Datagrid, TextField, NumberField, DateField } from 'react-admin';

const PilotList: React.FC = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <NumberField source="id" label="ID" />
      <TextField source="title" label="Title" />
      <TextField source="certifications" label="Certifications" />
      <NumberField source="flightHours" label="Flight Hours" />
      <DateField source="createdAt" label="Created At" />
      <DateField source="updatedAt" label="Updated At" />
    </Datagrid>
  </List>
);

export default PilotList;
