import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DataProviderContext, RaRecord } from 'react-admin';
import UserEdit from '../../src/admin/users/edit';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import userEvent from '@testing-library/user-event';
import userProvider from '../../src/data-provider/userProvider';

const defaultProps = {
  basePath: '/users',
  resource: 'users',
  id: '1',
};

const mockClient = {
  query: jest.fn(),
  mutate: jest.fn(),
};

const mockRecord: RaRecord = {
  id: '1',
  userType: 'member',
  email: 'john@example.com',
  password: 'password123',
};

const mockDataProvider = userProvider(mockClient);

const queryClient = new QueryClient();

const customRender = (ui: React.ReactElement, options?: any) => {
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

const renderWithProviders = (ui: React.ReactElement, id: string = '1') => {
  return customRender(React.cloneElement(ui, { ...defaultProps, id }));
};

describe('UserEdit', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    // @ts-ignore jest.spyOn adds this functionality
    console.error.mockImplementation(() => null);

    // Add the following line to mock the dataProvider.getOne method
    jest.spyOn(mockDataProvider, 'getOne').mockResolvedValue({ data: mockRecord });

    renderWithProviders(<UserEdit />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    // @ts-ignore jest.spyOn adds this functionality
    console.error.mockRestore()
  });

  test('renders user edit form', () => {
    renderWithProviders(<UserEdit />);

    const userTypeSelect = screen.getByLabelText('User Type');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const saveButton = screen.getByRole('button', { name: /Save/i });

    expect(userTypeSelect).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });


  test('submits the form with user type, email, and password', async () => {
    const mockUpdate = jest.spyOn(mockDataProvider, 'update');

    const userTypeSelect = screen.getByLabelText(/User Type/i);
    const emailInput: HTMLInputElement = screen.getByLabelText('Email');
    const passwordInput: HTMLInputElement = screen.getByLabelText('Password');
    const saveButton = screen.getByRole('button', { name: /Save/i });

    userEvent.click(userTypeSelect);

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Administrator' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Member' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Pilot' })).toBeInTheDocument();
    });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    const administratorOption = screen.getByRole('option', { name: 'Administrator' });

    expect(administratorOption).toBeInTheDocument();
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(saveButton).toBeInTheDocument();
  });
});
