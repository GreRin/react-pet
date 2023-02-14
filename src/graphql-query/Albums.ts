// import { request } from 'graphql-request';
import { getAccessToken } from '../common/common';
import { ALBUMS_QUERY, CREATE_FOTO, DELETE_ALBUM, GET_ALBUM_BY_ID } from './query.list';
import { client } from './apollo.server';

export const getAlbums = async (userId: string): Promise<any> => {
  const mutation = ALBUMS_QUERY;
  const variables = { userId };
  const context = {
    headers: { Cookies: getAccessToken() },
  };

  const {
    data: { getAllAlbums },
  } = await client.mutate({ mutation, variables, context });
  // const { getAllAlbums } = await request(GRAPHQL_URL, graphql-query, variables, headers);
  return getAllAlbums;
};

export const getAlbum = async (albumId: string): Promise<any> => {
  const mutation = GET_ALBUM_BY_ID;
  const variables = { albumId };
  const context = {
    headers: { Cookies: getAccessToken() },
  };

  const {
    data: { getAlbumById },
  } = await client.mutate({ mutation, variables, context });
  return getAlbumById[0];
};

export const createNewFoto = async (albumId: string, title: string, ref: string): Promise<any> => {
  const mutation = CREATE_FOTO;
  const variables = { albumId, title, ref };
  const context = {
    headers: { Cookies: getAccessToken() },
  };
  const {
    data: { createFoto },
  } = await client.mutate({
    mutation,
    variables,
    context,
    // update: (cache, { data }) => {
    //   console.log('[creteAlbum] album', data);
    //   cache.writeQuery({
    //     graphql-query: GET_ALBUM_BY_ID,
    //     variables: { _id: data.createFoto._id },
    //     data: data.createFoto,
    //   });
    // },
  });
  return createFoto;
};

export const deleteAlbums = async (albumId: string): Promise<any> => {
  const mutation = DELETE_ALBUM;
  const variables = { albumId };
  const context = {
    headers: { Cookies: getAccessToken() },
  };
  const {
    data: { deleteAlbum },
  } = await client.mutate({ mutation, variables, context });
  return deleteAlbum;
};
