import * as React from 'react';
import { List, Datagrid, TextField, NumberField, DateField } from 'react-admin';

const AircraftList: React.FC = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <NumberField source="id" label="ID" />
      <NumberField source="aircraftType" label="Aircraft Type" />
      <TextField source="model" label="Model" />
      <TextField source="eco" label="Eco" />
      <NumberField source="status" label="Status" />
      <NumberField source="maxPassengers" label="Max Passengers" />
      <DateField source="createdAt" label="Created At" />
      <DateField source="updatedAt" label="Updated At" />
    </Datagrid>
  </List>
);

export default AircraftList;