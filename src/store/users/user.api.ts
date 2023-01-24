import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IUserPr } from '../../models/models';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/users',
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    getAllUsers: build.query<IUserPr[], string>({
      query: () => ({
        url: `/`,
        credentials: 'include',
      }),
    }),
    getUser: build.query<IUserPr, string>({
      query: (id: string) => ({
        url: `/${id}`,
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserQuery, useLazyGetAllUsersQuery, useLazyGetUserQuery } = usersApi;
