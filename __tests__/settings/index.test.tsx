import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DataProviderContext } from 'react-admin';
import SettingsForm from '../../src/admin/settings/settings-form';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import userEvent from '@testing-library/user-event';
import userProvider from '../../src/data-provider/userProvider';

const mockClient = {
  query: jest.fn(),
  mutate: jest.fn(),
};

const mockDataProvider = {
  ...userProvider(mockClient),
  getSettings: jest.fn(),
  updateSettings: jest.fn(),
}
const queryClient = new QueryClient();

const customRender = (ui: React.ReactElement) => {
  return render(
    <DataProviderContext.Provider value={mockDataProvider}>
      <ThemeProvider theme={createTheme()}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>{ui}</MemoryRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </DataProviderContext.Provider>
  );
};

const renderWithProviders = (ui: React.ReactElement) => {
  return customRender(React.cloneElement(ui));
};

describe('SettingsForm', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error')
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);

    renderWithProviders(<SettingsForm />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockRestore()
  });

  test('renders the form', async () => {
    expect(screen.getByLabelText('Basic')).toBeInTheDocument();
    expect(screen.getByLabelText('Gold')).toBeInTheDocument();
    expect(screen.getByLabelText('Platinum')).toBeInTheDocument();
    expect(screen.getByLabelText('Penalty Percentage')).toBeInTheDocument();
    expect(screen.getByLabelText('Discount for empty legs')).toBeInTheDocument();
    expect(screen.getByLabelText('Margin for additional hours')).toBeInTheDocument();
    expect(screen.getByLabelText('Set the timeout for reservations')).toBeInTheDocument();
    expect(screen.getByLabelText('Helicopter long flight punishment')).toBeInTheDocument();
    expect(screen.getByLabelText('Air plane short flight punishment')).toBeInTheDocument();
    expect(screen.getByLabelText('Set the threshold for long or short flights')).toBeInTheDocument();
  });

  test('submits the form when Save button is clicked', async () => {
    const basicMembershipPriceField = screen.getByLabelText('Basic');
    userEvent.type(basicMembershipPriceField, '15');
    await waitFor(() => expect(basicMembershipPriceField).toHaveValue(15));

    const goldMembershipPriceField = screen.getByLabelText('Gold');
    userEvent.type(goldMembershipPriceField, '20');
    await waitFor(() => expect(goldMembershipPriceField).toHaveValue(20));

    const platinumMembershipPriceField = screen.getByLabelText('Platinum');
    userEvent.type(platinumMembershipPriceField, '25');
    await waitFor(() => expect(platinumMembershipPriceField).toHaveValue(25));

    const penaltyPercentageField = screen.getByLabelText('Penalty Percentage');
    userEvent.type(penaltyPercentageField, '30');
    await waitFor(() => expect(penaltyPercentageField).toHaveValue(30));

    const discountForEmptyLegsField = screen.getByLabelText('Discount for empty legs');
    userEvent.type(discountForEmptyLegsField, '35');
    await waitFor(() => expect(discountForEmptyLegsField).toHaveValue(35));

    const marginForAdditionalHoursField = screen.getByLabelText('Margin for additional hours');
    userEvent.type(marginForAdditionalHoursField, '40');
    await waitFor(() => expect(marginForAdditionalHoursField).toHaveValue(40));

    const reservationTimeoutField = screen.getByLabelText('Set the timeout for reservations');
    userEvent.type(reservationTimeoutField, '45');
    await waitFor(() => expect(reservationTimeoutField).toHaveValue(45));

    const helicopterLongFlightPunishmentField = screen.getByLabelText('Helicopter long flight punishment');
    userEvent.type(helicopterLongFlightPunishmentField, '50');
    await waitFor(() => expect(helicopterLongFlightPunishmentField).toHaveValue(50));

    const airPlaneShortFlightPunishmentField = screen.getByLabelText('Air plane short flight punishment');
    userEvent.type(airPlaneShortFlightPunishmentField, '55');
    await waitFor(() => expect(airPlaneShortFlightPunishmentField).toHaveValue(55));

    const thresholdForLongOrShortFlightsField = screen.getByLabelText('Set the threshold for long or short flights');
    userEvent.type(thresholdForLongOrShortFlightsField, '60');
    await waitFor(() => expect(thresholdForLongOrShortFlightsField).toHaveValue(60));

    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => expect(mockDataProvider.updateSettings).toHaveBeenCalledWith("Settings", {
      basicMembershipPrice: 15,
      goldMembershipPrice: 20,
      platinumMembershipPrice: 25,
      penaltyPercentage: 30,
      discountForEmptyLegs: 35,
      marginForAdditionalHours: 40,
      reservationTimeout: 45,
      helicopterLongFlightPunishment: 50,
      airplaneShortFlightPunishment: 55,
      longShortFlightThreshold: 60,
    }));
  });

  test('disables the Save button if one of the inputs is empty', async () => {
    const input: HTMLInputElement = screen.getByLabelText('Basic');
    input.value = '';

    const changeEvent = new Event('change', { bubbles: true });
    input.dispatchEvent(changeEvent);

    const saveButton = screen.getByText('Save');
    expect(saveButton).toBeDisabled();
  });
});

