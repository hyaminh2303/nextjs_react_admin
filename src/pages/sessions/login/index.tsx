// src/LoginPage.tsx
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

const LoginPage: React.FC = (props) => {
  return (
    <Login {...props}>
      <LoginForm />
    </Login>
  );
};

export default LoginPage;
