import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IAlbum, IPhoto } from '../../interfaces';
import { BaseQueryArg } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { faker } from '@faker-js/faker/locale/en';

export const photosApi = createApi({
  reducerPath: 'fotos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'localhost://4000/api',
  }),
  endpoints(build) {
    return {
      fetchPhotos: build.query({
        query(album: IAlbum): BaseQueryArg<any> {
          return {
            url: '/photos',
            params: {
              albumId: album._id,
            },
          };
        },
      }),
      addPhoto: build.mutation({
        query(data: { userId: string; albumId: string; photo: IPhoto }) {
          return {
            url: '/photo',
            method: 'POST',
            body: {
              userId: data.userId,
              albumId: data.albumId,
              url: faker.image.abstract(150, 150, true),
            },
          };
        },
      }),
      deletePhoto: build.mutation({
        query(photo: IPhoto): BaseQueryArg<any> {
          return {
            method: 'DELETE',
            url: `/photos/${photo._id}`,
          };
        },
      }),
    };
  },
});

export const { useFetchPhotosQuery, useAddPhotoMutation, useDeletePhotoMutation } = photosApi;
