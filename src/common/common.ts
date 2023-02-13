import { ACCESS_TOKEN_KEY } from '../constants/constants';

export const getAccessToken = (): string => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || '';
};
