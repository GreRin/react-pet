import { ApolloClient, gql, InMemoryCache, createHttpLink } from '@apollo/client';
import { request } from 'graphql-request';
import { getAccessToken } from '../common/common';
import { GRAPHQL_URL } from '../constants/constants';
import { setContext } from '@apollo/client/link/context';

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
      fetchPolicy: 'network-only',
    },
  },
});

export const getAlbums = async (userId: string): Promise<any> => {
  const mutation = gql`
    mutation getAllAlbums($userId: String) {
      getAllAlbums(userId: $userId) {
        _id
        userId
        title
        foto {
          _id
          title
          ref
        }
        createdAt
      }
    }
  `;
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

export const createAlbums = async (userId: string, title: string): Promise<any> => {
  const mutation = gql`
    mutation getAllAlbums {
      albums: getAllAlbums(userId: String, title: String) {
        _id
        userId
        title
        foto {
          _id
          title
          ref
        }
        createdAt
      }
    }
  `;
  const variables = { userId };
  const context = {
    headers: { Cookies: getAccessToken() },
  };
  const {
    data: { albums },
  } = await client.mutate({ mutation, variables, context });
  return albums;
};

export const deleteAlbums = async (albumId: string): Promise<any> => {
  const mutation = gql`
    mutation deleteAlbum($albumId: String!) {
      deleteAlbum(_id: $albumId) {
        userId
        title
        foto {
          _id
          title
          ref
        }
        createdAt
      }
    }
  `;
  const variables = { albumId };
  const context = {
    headers: { Cookies: getAccessToken() },
  };
  const {
    data: { deleteAlbum },
  } = await client.mutate({ mutation, variables, context });
  return deleteAlbum;
};
