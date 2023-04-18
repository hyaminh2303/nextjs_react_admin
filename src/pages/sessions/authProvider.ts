// src/authProvider.ts
import { AuthProvider } from 'react-admin';
import { Auth } from 'aws-amplify';

const authProvider: AuthProvider = {
  login: async ({ email }) => {
    // Store the user's email or JWT token in localStorage
    localStorage.setItem('userEmail', email);
    return Promise.resolve();
  },
  logout: async () => {
    localStorage.removeItem('userEmail');
    try {
      await Auth.signOut();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem('userEmail') ? Promise.resolve() : Promise.reject(),
  getPermissions: () => Promise.resolve(),
};

export default authProvider;
