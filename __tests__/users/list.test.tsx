import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { DataProviderContext } from 'react-admin';
import UserList from '../../src/admin/users/list';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import userProvider from '../../src/data-provider/userProvider';

const defaultProps = {
  basePath: '/users',
  resource: 'users',
};

const mockClient = {
  query: jest.fn(),
  mutate: jest.fn(),
};

const mockDataProvider = {
  ...userProvider(mockClient),
  getList: jest.fn(() => Promise.resolve({
    data: [
      { id: 1, email: 'administrator@example.com', userType: 'administrator', createdAt: '2023-01-01', updatedAt: '2023-01-01' },
      { id: 2, email: 'member@example.com', userType: 'member', createdAt: '2023-01-02', updatedAt: '2023-01-02' },
    ],
    total: 2,
  })),
};

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
  return customRender(React.cloneElement(ui, { ...defaultProps }));
};

describe('UserList', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error')
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);

    renderWithProviders(<UserList />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockRestore()
  });

  test('renders a list of users', async () => {
    await waitFor(() => {
      expect(screen.getByText('administrator@example.com')).toBeInTheDocument();
      expect(screen.getByText('member@example.com')).toBeInTheDocument();
    });

    const idFields = screen.getAllByTestId('id');
    const emailFields = screen.getAllByTestId('email');
    const userTypeFields = screen.getAllByTestId('userType');
    const createdAtFields = screen.getAllByTestId('createdAt');
    const updatedAtFields = screen.getAllByTestId('updatedAt');

    expect(idFields[0]).toHaveTextContent('1');
    expect(emailFields[0]).toHaveTextContent('administrator@example.com');
    expect(userTypeFields[0]).toHaveTextContent('admin');
    expect(createdAtFields[0]).toHaveTextContent('1/1/2023');
    expect(updatedAtFields[0]).toHaveTextContent('1/1/2023');

    expect(idFields[1]).toHaveTextContent('2');
    expect(emailFields[1]).toHaveTextContent('member@example.com');
    expect(userTypeFields[1]).toHaveTextContent('member');
    expect(createdAtFields[1]).toHaveTextContent('1/2/2023');
    expect(updatedAtFields[1]).toHaveTextContent('1/2/2023');
  });
});

