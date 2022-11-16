import { createContext } from 'react';

function noop(
  accessToken: string | null,
  userId: string | null,
  messageData: string | null,
  statusData: number | null
): void {}

export const AuthContext = createContext({
  accessToken: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
  messageData: null,
  statusData: null,
});
