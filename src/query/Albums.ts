import { ApolloClient, gql, InMemoryCache, createHttpLink } from '@apollo/client';
import { request } from 'graphql-request';
import { getAccessToken } from '../common/common';
import { GRAPHQL_URL } from '../constants/constants';
import { setContext } from '@apollo/client/link/context';
import { ALBUMS_QUERY, CREATE_FOTO, DELETE_ALBUM, GET_ALBUM_BY_ID } from './query.list';

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAccessToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-first',
    },
    mutate: {
      fetchPolicy: 'network-only',
    },
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export const getAlbums = async (userId: string): Promise<any> => {
  const mutation = ALBUMS_QUERY;
  const variables = { userId };
  const context = {
    headers: { Cookies: getAccessToken() },
  };

  const {
    data: { getAllAlbums },
  } = await client.mutate({ mutation, variables, context });
  // const { getAllAlbums } = await request(GRAPHQL_URL, query, variables, headers);
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
    //     query: GET_ALBUM_BY_ID,
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
