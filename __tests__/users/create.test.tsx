import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Create, DataProviderContext } from 'react-admin';
import UserCreate from '../../src/admin/users/create';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import userEvent from '@testing-library/user-event';
import userProvider from '../../src/data-provider/userProvider';

const defaultProps = {
  basePath: '/users',
  resource: 'users',
};

const mockClient = {
  query: jest.fn(),
  mutate: jest.fn(),
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

const renderWithProviders = (ui: React.ReactElement) => {
  return customRender(<Create {...defaultProps}>{ui}</Create>);
};

describe('UserCreate', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);

    renderWithProviders(<UserCreate />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockRestore()
  });

  test('renders user creation form', () => {
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
    const mockCreate = jest.spyOn(mockDataProvider, 'create');

    const userTypeSelect = screen.getByLabelText(/User Type/i);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const saveButton = screen.getByRole('button', { name: /Save/i });

    userEvent.click(userTypeSelect);

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Admin' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Member' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Pilot' })).toBeInTheDocument();
    });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    const adminOption = screen.getByRole('option', { name: 'Admin' });

    userEvent.click(adminOption);

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalled();
    });
  });
});
