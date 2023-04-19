import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification, Login, LoginFormProps } from 'react-admin';
import { Auth } from 'aws-amplify';
import { TextField, Button, Typography, Link } from '@mui/material';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#f2f2f2',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: "10px",
    padding: "10px",
  },
  input: {
    marginBottom: "10px",
  },
  submitButton: {
    marginTop: "10px",
  },
  containerBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();
  const notify = useNotify();
  const classes = useStyles();

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
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        fullWidth
        autoFocus
        className={classes.input}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        fullWidth
        className={classes.input}
      />
      <Button type="submit" color="primary" variant="contained" className={classes.submitButton}>
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
  const classes = useStyles();

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
    return (
      <div className={classes.form}>
        <Typography variant="body1">
          Instructions to reset your password have been sent to your email address
        </Typography>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        fullWidth
        autoFocus
        className={classes.input}
      />
      <Button type="submit" color="primary" variant="contained" className={classes.submitButton}>
        Reset Password
      </Button>
    </form>
  );
};

const LoginPage: React.FC = (props) => {
  const classes = useStyles();
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleForgotPasswordClick = () => {
    setForgotPassword(true);
  };

  const handleBackToLoginClick = () => {
    setForgotPassword(false);
  };

  if (forgotPassword) {
    return (
      <Login {...props}>
        <ForgotPasswordForm />
        <div className={classes.containerBtn}>
          <Button onClick={handleBackToLoginClick}>Back to Login</Button>
        </div>
      </Login>
    );
  }

  return (
    <Login {...props}>
      <LoginForm />
      <div className={classes.containerBtn}>
        <Button onClick={handleForgotPasswordClick}>Forgot Password</Button>
      </div>
    </Login>
  );
};

export default LoginPage;
