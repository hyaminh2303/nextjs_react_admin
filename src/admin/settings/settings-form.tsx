import * as React from 'react';
import { useDataProvider, useGetIdentity } from 'react-admin';
import Box from '@mui/material/Box';
import { TextField, Button, Typography } from '@mui/material';
import { useMutation } from 'react-query';

const SettingsForm: React.FC = () => {
  const [settings, setSettings] = React.useState<any>();
  const dataProvider = useDataProvider();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dataProvider.getSettings('Settings');
        console.log(response);
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchData();
  }, [dataProvider]);

  return (
    <form>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" component="h2">
          Membership Type
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            sx={{mr: 2}}
            size="small"
            label="Basic"
            fullWidth
            value={settings?.basicMembershipPrice || ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSettings({ ...settings, basicMembershipPrice: event.target.value });
            }}
          />
          <TextField
            sx={{mr: 2}}
            size="small"
            label="Gold"
            fullWidth
            value={settings?.goldMembershipPrice || ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSettings({ ...settings, goldMembershipPrice: event.target.value });
            }}
          />
          <TextField
            sx={{mr: 2}}
            size="small"
            label="Platinum"
            fullWidth
            value={settings?.platinumMembershipPrice}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSettings({ ...settings, platinumMembershipPrice: event.target.value });
            }}
          />
        </Box>
      </Box>

      {/* <Box>
        <Typography variant="h6" component="h2">
          Penalty Percentage
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField sx={{mr: 2}} size="small" label="Penalty Percentage" fullWidth />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" component="h2">
          Discounts
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextInput sx={{mr: 2}} size="small" source="basic" label="Discounts" fullWidth />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" component="h2">
          Margins for additional hours
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextInput sx={{mr: 2}} size="small" source="basic" label="Margins for additional hours" fullWidth />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" component="h2">
          Set the timeout for reservations
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextInput sx={{mr: 2}} size="small" source="basic" label="Set the timeout for reservations" fullWidth />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" component="h2">
          Punishments
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextInput sx={{mr: 2}} size="small" source="basic" label="Punishments" fullWidth />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" component="h2">
          Set the threshold for long or short flights
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextInput sx={{mr: 2}} size="small" source="basic" label="Set the threshold for long or short flights" fullWidth />
        </Box>
      </Box>

      <Box sx={{ mt: 2, mb: 2 }}>
        <Button type="submit" color="primary" variant="contained" disabled={isLoading}>
          Save
        </Button>
      </Box> */}

    </form>
  );
};

export default SettingsForm;
