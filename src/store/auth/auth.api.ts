import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILogin } from '../../models/models';
import { getAccessToken } from '../../common/common';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    prepareHeaders: (headers) => {
      const accessToken = getAccessToken();
      if (accessToken) {
        headers.set('cookies', accessToken);
        headers.set('authorization', accessToken ? accessToken : '');
      }
      headers.set('Access-Control-Allow-Credentials', 'true');
      headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    login: build.query<ILogin, string>({
      query: (body) => ({
        url: `login`,
      }),
    }),
    signup: build.query<ILogin, any>({
      query: () => ({
        url: `signup`,
      }),
    }),
  }),
});

export const { useLoginQuery, useSignupQuery } = authApi;
