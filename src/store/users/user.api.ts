import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IUserPr } from '../../models/models';
import { getAccessToken } from '../../common/common';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/users',
    prepareHeaders: (headers) => {
      const accessToken = getAccessToken();
      console.log(accessToken);
      if (accessToken) {
        headers.set('cookies', accessToken);
        headers.set('authorization', accessToken ? accessToken : '');
      }
      return headers;
    },
    credentials: 'include',
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
