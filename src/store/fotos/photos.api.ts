import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IAlbum, IPhoto } from '../../interfaces';
import { BaseQueryArg } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { faker } from '@faker-js/faker/locale/en';

export const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/',
  }),
  endpoints(build) {
    return {
      fetchPhotos: build.query({
        query(album: IAlbum): BaseQueryArg<any> {
          return {
            url: `/photos/${album._id}`,
          };
        },
      }),
      addPhoto: build.mutation({
        query(data: { _id: string; photo: IPhoto }) {
          console.log(data);
          return {
            url: '/photos',
            method: 'POST',
            body: {
              albumId: data._id,
              title: faker.name.jobType(),
              ref: faker.image.abstract(150, 150, true),
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
