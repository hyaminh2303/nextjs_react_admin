import * as React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

const aircraftTypes = [
  { id: 'single_engine', name: 'single_engine' },
  { id: 'multi_engine', name: 'multi_engine' },
  { id: 'turboprop', name: 'turboprop' },
  { id: 'jet', name: 'jet' },
  { id: 'helicopter', name: 'helicopter' },
]
const statuses = [
  { id: 'available', name: 'available' },
  { id: 'unavailable', name: 'unavailable' },
]

export const AircraftEdit: React.FC = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <SelectInput source="aircraftType" label="Aircraft Type" choices={aircraftTypes} />
      <TextInput source="model" label="Model" />
      <TextInput source="eco" label="Eco" />
      <SelectInput source="status" label="Status" choices={statuses} />
      <NumberInput source="maxPassengers" label="Max Passengers" />
    </SimpleForm>
  </Edit>
);
