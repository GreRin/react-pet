import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILogin } from '../../models/models';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/',
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
