import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../../src/pages/sessions/login';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { useLogin } from 'react-admin';
import { Auth } from 'aws-amplify';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('aws-amplify', () => ({
  Auth: {
    signIn: jest.fn(),
    forgotPassword: jest.fn(),
    forgotPasswordSubmit: jest.fn(),
  },
}));

jest.mock('react-admin', () => ({
  ...jest.requireActual('react-admin'),
  useLogin: jest.fn(),
}));

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
};

describe('LoginPage', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error');
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);

    renderWithProviders(<LoginPage />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockRestore();
  });

  test('renders login form', () => {
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');
    const forgotPasswordButton = screen.getByText('Forgot Password');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(forgotPasswordButton).toBeInTheDocument();
  });

  test('submits the form with email and password', async () => {
    const mockLogin = jest.fn();
    (useLogin as jest.Mock).mockReturnValue(mockLogin);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith({ email: 'test@example.com' }),
    );
  });

  test('submits the form forgot password with email', async () => {
    const forgotPasswordButton = screen.getByText('Forgot Password');
    fireEvent.click(forgotPasswordButton);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    expect(screen.getByPlaceholderText('Email')).toHaveValue('test@example.com');

    const resetPasswordButton = screen.getByRole('button', {
      name: 'Reset Password',
    });
    expect(resetPasswordButton).toBeInTheDocument();

    fireEvent.click(resetPasswordButton);

    await waitFor(() =>
      expect(Auth.forgotPassword).toHaveBeenCalledWith('test@example.com'),
    );
  });

  test('submits the form reset password with email, code and new password', async () => {
    const forgotPasswordButton = screen.getByText('Forgot Password');
    fireEvent.click(forgotPasswordButton);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    expect(screen.getByPlaceholderText('Email')).toHaveValue('test@example.com');

    const resetPasswordButton = screen.getByRole('button', {
      name: 'Reset Password',
    });
    expect(resetPasswordButton).toBeInTheDocument();

    fireEvent.click(resetPasswordButton);

    await waitFor(() =>
      expect(Auth.forgotPassword).toHaveBeenCalledWith('test@example.com'),
    );

    const codeInput = screen.getByPlaceholderText('Verification Code');
    fireEvent.change(codeInput, { target: { value: '123456' } });
    const newPasswordInput = screen.getByPlaceholderText('New Password');
    const confirmNewPasswordInput = screen.getByPlaceholderText('Confirm New Password');
    fireEvent.change(newPasswordInput, { target: { value: 'newpassword' } });
    fireEvent.change(confirmNewPasswordInput, {
      target: { value: 'newpassword' },
    });
    const resetPasswordButtonSubmitted = screen.getByRole('button', {
      name: 'Reset Password',
    });

    fireEvent.click(resetPasswordButtonSubmitted);

    await waitFor(() =>
      expect(Auth.forgotPasswordSubmit).toHaveBeenCalledWith(
        'test@example.com',
        '123456',
        'newpassword',
      ),
    );
  });
});
