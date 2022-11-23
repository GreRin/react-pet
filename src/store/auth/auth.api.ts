import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILogin } from '../../models/models';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem('accessToken') || '';
      console.log(document.cookie);
      headers.set('cookies', document.cookie);
      headers.set('authorization', accessToken ? accessToken : '');
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
    getUsers: build.query<any, any>({
      query: () => ({
        url: `users`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginQuery, useSignupQuery, useGetUsersQuery } = authApi;
