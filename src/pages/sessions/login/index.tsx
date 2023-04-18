import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification, Login, LoginFormProps } from 'react-admin';
import { TextField, Button } from '@material-ui/core';
import { Auth } from 'aws-amplify';

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await Auth.signIn(email, password);
      login({ email });
    } catch (error) {
      notify('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        fullWidth
        autoFocus
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        fullWidth
      />
      <Button type="submit" color="primary" variant="contained">
        Login
      </Button>
      <Notification />
    </form>
  );
};

const ForgotPasswordForm: React.FC = (props) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const notify = useNotify();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log(email)
      await Auth.forgotPassword(email);
      setSubmitted(true);
    } catch (error) {
      notify('An error occurred while resetting your password');
    }
  };

  if (submitted) {
    return <p>Instructions to reset your password have been sent to your email address</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        fullWidth
        autoFocus
      />
      <Button type="submit" color="primary" variant="contained">
        Reset Password
      </Button>
      <Notification />
    </form>
  );
};

const LoginPage: React.FC = (props) => {
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleForgotPasswordClick = () => {
    setForgotPassword(true);
  };

  const handleBackToLoginClick = () => {
    setForgotPassword(false);
  };

  if (forgotPassword) {
    return (
      <>
        <Button onClick={handleBackToLoginClick}>Back to Login</Button>
        <ForgotPasswordForm />
      </>
    );
  }

  return (
    <Login {...props}>
      <LoginForm />
      <Button onClick={handleForgotPasswordClick}>Forgot Password</Button>
    </Login>
  );
};

export default LoginPage;
