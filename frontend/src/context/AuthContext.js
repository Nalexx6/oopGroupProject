import { createContext } from 'react';

export const AuthContext = createContext({
  getUserId: () => {},
  login: () => {},
  logout: () => {}
});