import { createContext } from 'react';

function noop(token: string | null, userId: string | null): void {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
});
