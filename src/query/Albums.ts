import { request, gql } from 'graphql-request';
import { getAccessToken } from '../common/common';
import { GRAPHQL_URL } from '../constants/constants';

export const getAlbums = async (userId: string): Promise<any> => {
  const query = gql`
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
  const headers = { Cookies: getAccessToken() };
  const { getAllAlbums } = await request(GRAPHQL_URL, query, variables, headers);
  return getAllAlbums;
};

export const createAlbums = async (userId: string, title: string): Promise<any> => {
  const query = gql`
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
  const headers = { Cookies: getAccessToken() };
  const { albums } = await request(GRAPHQL_URL, query, variables, headers);
  return albums;
};

export const deleteAlbums = async (albumId: string): Promise<any> => {
  const query = gql`
    mutation deleteAlbum($albumId: String) {
      deleteAlbum(_id: $albumId) {
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
  const variables = { albumId };
  const headers = { Cookies: getAccessToken() };
  const { getAllAlbums } = await request(GRAPHQL_URL, query, variables, headers);
  return getAllAlbums;
};
