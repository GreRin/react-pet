import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BaseQueryArg } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { faker } from '@faker-js/faker/locale/en';
import { IAlbum, IUser } from '../../interfaces';

export const albumsApi = createApi({
  reducerPath: 'albumsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/',
    credentials: 'include',
  }),
  tagTypes: ['UsersAlbums', 'Album'],
  endpoints(build) {
    return {
      addAlbum: build.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: 'UsersAlbums', userId: user.id }];
        },
        query(user: IUser): BaseQueryArg<any> {
          return {
            url: `/albums`,
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      deleteAlbum: build.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: 'Album', _id: album.albumId }];
        },
        query(data: any): BaseQueryArg<any> {
          return {
            url: `/albums/${data.userId}/album/${data.albumId}`,
            method: 'DELETE',
          };
        },
      }),
      fetchAlbums: build.query({
        providesTags: (result, error, user) => {
          const tags = result.map((album: IAlbum) => {
            return { type: 'Album', _id: album._id };
          });
          tags.push({ type: 'UsersAlbums', userId: user.id });
          return tags;
        },
        query(user: IUser): BaseQueryArg<any> {
          return {
            url: `/albums/${user.id}`,
            params: {
              userId: user.id,
            },
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation } = albumsApi;
