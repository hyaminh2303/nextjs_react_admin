import * as React from 'react';
import { useDataProvider } from 'react-admin';
import Box from '@mui/material/Box';
import { TextField, Button, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const SettingsForm: React.FC = () => {
  const dataProvider = useDataProvider();

  const { handleSubmit, control, reset, formState, register } = useForm({
    defaultValues: {
      basicMembershipPrice: 0,
      goldMembershipPrice: 0,
      platinumMembershipPrice: 0,
      penaltyPercentage: 0,
      discountForEmptyLegs: 0,
      marginForAdditionalHours: 0,
      reservationTimeout: 0,
      helicopterLongFlightPunishment: 0,
      airplaneShortFlightPunishment: 0,
      longShortFlightThreshold: 0,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    try {
      const input = {
        ...data,
        basicMembershipPrice: parseFloat(data.basicMembershipPrice),
        goldMembershipPrice: parseFloat(data.goldMembershipPrice),
        platinumMembershipPrice: parseFloat(data.platinumMembershipPrice),
        penaltyPercentage: parseFloat(data.penaltyPercentage),
        discountForEmptyLegs: parseFloat(data.discountForEmptyLegs),
        marginForAdditionalHours: parseFloat(data.marginForAdditionalHours),
        reservationTimeout: parseFloat(data.reservationTimeout),
        helicopterLongFlightPunishment: parseFloat(data.helicopterLongFlightPunishment),
        airplaneShortFlightPunishment: parseFloat(data.airplaneShortFlightPunishment),
        longShortFlightThreshold: parseFloat(data.longShortFlightThreshold),
      };

      const response = await dataProvider.updateSettings('Settings', input);
      console.log('Settings updated:', response.data);
      fetchData();
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await dataProvider.getSettings('Settings');
      const {
        __typename,
        ...settingsData
      } = response.data;

      reset(settingsData);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [dataProvider, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" component="h2">
          Membership Type
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Controller
            name="basicMembershipPrice"
            control={control}
            render={({ field }) => (
              <TextField
                {...register('basicMembershipPrice', { required: true })}
                sx={{ mr: 2 }}
                size="small"
                type="number"
                label="Basic"
                id="basicMembershipPrice"
                fullWidth
                inputProps={{ step: 'any' }}
                {...field}
              />
            )}
          />
          <Controller
            name="goldMembershipPrice"
            control={control}
            render={({ field }) => (
              <TextField
                {...register('goldMembershipPrice', { required: true })}
                sx={{ mr: 2 }}
                size="small"
                type="number"
                label="Gold"
                fullWidth
                {...field}
              />
            )}
          />

          <Controller
            name="platinumMembershipPrice"
            control={control}
            render={({ field }) => (
              <TextField
                sx={{ mr: 2 }}
                {...register('platinumMembershipPrice', { required: true })}
                size="small"
                type="number"
                label="Platinum"
                fullWidth
                {...field}
              />
            )}
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" component="h2">
          Penalty Percentage
        </Typography>
        <Controller
          name="penaltyPercentage"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ mr: 2, width: '50%' }}
              {...register('penaltyPercentage', { required: true })}
              size="small"
              type="number"
              label="Penalty Percentage"
              fullWidth
              {...field}
            />
          )}
        />
      </Box>

      <Box>
        <Typography variant="h6" component="h2">
          Discount for empty legs
        </Typography>
        <Controller
          name="discountForEmptyLegs"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ mr: 2, width: '50%' }}
              {...register('discountForEmptyLegs', { required: true })}
              size="small"
              type="number"
              label="Discount for empty legs"
              fullWidth
              {...field}
            />
          )}
        />
      </Box>

      <Box>
        <Typography variant="h6" component="h2">
          Margins for additional hours
        </Typography>
        <Controller
          name="marginForAdditionalHours"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ mr: 2, width: '50%' }}
              {...register('marginForAdditionalHours', { required: true })}
              size="small"
              type="number"
              label="Margin for additional hours"
              fullWidth
              {...field}
            />
          )}
        />
      </Box>

      <Box>
        <Typography variant="h6" component="h2">
          Set the timeout for reservations
        </Typography>
        <Controller
          name="reservationTimeout"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ mr: 2, width: '50%' }}
              {...register('reservationTimeout', { required: true })}
              size="small"
              type="number"
              label="Set the timeout for reservations"
              fullWidth
              {...field}
            />
          )}
        />
      </Box>

      <Box>
        <Typography variant="h6" component="h2">
          Helicopter long flight punishment
        </Typography>
        <Controller
          name="helicopterLongFlightPunishment"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ mr: 2, width: '50%' }}
              {...register('helicopterLongFlightPunishment', { required: true })}
              size="small"
              type="number"
              label="Helicopter long flight punishment"
              fullWidth
              {...field}
            />
          )}
        />
      </Box>

      <Box>
        <Typography variant="h6" component="h2">
          Air plane short flight punishment
        </Typography>
        <Controller
          name="airplaneShortFlightPunishment"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ mr: 2, width: '50%' }}
              {...register('airplaneShortFlightPunishment', { required: true })}
              size="small"
              type="number"
              label="Air plane short flight punishment"
              fullWidth
              {...field}
            />
          )}
        />
      </Box>

      <Box>
        <Typography variant="h6" component="h2">
          Set the threshold for long or short flights
        </Typography>
        <Controller
          name="longShortFlightThreshold"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ mr: 2, width: '50%' }}
              {...register('longShortFlightThreshold', { required: true })}
              size="small"
              type="number"
              label="Set the threshold for long or short flights"
              fullWidth
              {...field}
            />
          )}
        />
      </Box>

      <Box sx={{ mt: 2, mb: 2 }}>
        <Button sx={{mr: 2}} type="submit" variant="contained" disabled={!formState.isValid || !formState.isDirty}>
          Save
        </Button>
        {formState.isDirty && (
          <Button onClick={() => reset()} variant="outlined">
            Cancel
          </Button>
        )}
      </Box>
    </form>
  );
};

export default SettingsForm;
