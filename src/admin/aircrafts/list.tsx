import * as React from 'react';
import { List, Datagrid, TextField, NumberField, DateField, ReferenceInput, TextInput, SelectInput, FilterLiveSearch } from 'react-admin';

const aircraftFilters = [
  <TextInput source="q" label="Search Status" alwaysOn />,
  <SelectInput source="status" label="Status" choices={[
    { id: 'available', name: 'Available' },
    { id: 'unavailable', name: 'Unavailable' },
  ]} />,
  <SelectInput source="aircraftType" label="Aircraft Type" choices={[
    { id: 'multi_engine', name: 'multi_engine' },
    { id: 'single_engine', name: 'single_engine' },
  ]} />,
  <FilterLiveSearch source="model" />
];

const AircraftList: React.FC = (props) => (
  <List {...props} filters={aircraftFilters}>
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