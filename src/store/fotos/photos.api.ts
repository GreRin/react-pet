import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IAlbum, IPhoto } from '../../interfaces';
import { BaseQueryArg } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { faker } from '@faker-js/faker/locale/en';

export const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/',
  }),
  tagTypes: ['Photo', 'AlbumPhotos'],
  endpoints(build) {
    return {
      fetchPhotos: build.query({
        providesTags: (result, error, album) => {
          const tags = result.map((photo: IPhoto) => {
            return { type: 'Photo', id: album._id };
          });
          tags.push({ type: 'AlbumPhotos', id: album._id });
          return tags;
        },
        query(album: IAlbum): BaseQueryArg<any> {
          return {
            url: `/photos/${album._id}`,
          };
        },
      }),
      addPhoto: build.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: 'AlbumPhotos', albumId: album._id }];
        },
        query(data: { _id: string; photo: IPhoto }): BaseQueryArg<any> {
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
        invalidatesTags: (result, error, photo) => {
          return [{ type: 'Photo', id: photo._id }];
        },
        query({ photo, albumId }): BaseQueryArg<any> {
          return {
            method: 'DELETE',
            url: `/photos/${photo._id}`,
            body: {
              albumId,
              photo,
            },
          };
        },
      }),
    };
  },
});

export const { useFetchPhotosQuery, useAddPhotoMutation, useDeletePhotoMutation } = photosApi;
