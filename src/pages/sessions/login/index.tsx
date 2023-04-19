import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification, Login, LoginFormProps } from 'react-admin';
import { Auth } from 'aws-amplify';
import { TextField, Button, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

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

const LoginPage: React.FC = (props) => {
  const router = useRouter();
  const classes = useStyles();
  const notify = useNotify();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await Auth.forgotPassword(email);
      setSubmitted(true);
      setForgotPassword(false);
      router.push('/#/reset-password');
    } catch (error) {
      notify('An error occurred while resetting your password');
    }
  };

  const handleVerifyCode = async () => {
    try {
      await Auth.forgotPasswordSubmit('', code, '');
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
      router.push('/#/login');
      setSubmitted(false);
      setForgotPassword(false);
      toast.success('Password reset successfully');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleForgotPasswordClick = () => {
    router.push('/#/forgot-password');
    setForgotPassword(true);
  };

  const handleBackToLoginClick = () => {
    router.push('/#/login');
    setForgotPassword(false);
    setSubmitted(false);
    setCode('');
    setNewPassword('');
    setConfirmNewPassword('');
    setEmail('');
  };

  if (forgotPassword) {
    return (
      <Login {...props}>
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
        <div className={classes.containerBtn}>
          <Button onClick={handleBackToLoginClick}>Back to Login</Button>
        </div>
      </Login>
    );
  }

  if (submitted) {
    return (
      <Login {...props}>
        <form className={classes.form}>
          <Typography variant="h5" mb={2}>
            Reset Password
          </Typography>
          <Typography mb={2}>
            Please enter the verification code sent to your email address:
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            label="Verification Code"
            type="text"
            fullWidth
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
          {code && (
            <>
              <Typography mb={2}>
                Please enter your new password and confirm it:
              </Typography>
              <TextField
                label="New Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                value={confirmNewPassword}
                onChange={(event) => setConfirmNewPassword(event.target.value)}
              />
              <Button
                variant="contained"
                onClick={handleResetPassword}
                disabled={newPassword !== confirmNewPassword}
              >
                Reset Password
              </Button>
            </>
          )}
          {!code && (
            <Button variant="contained" onClick={handleVerifyCode}>
              Verify Code
            </Button>
          )}
        </form>
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
