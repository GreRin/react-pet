import { request, gql } from 'graphql-request';
import { environment } from '../environments/environment';

const GRAPHQL_URL = `${environment.baseUrl}/graphql`;

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
  const { getAllAlbums } = await request(GRAPHQL_URL, query, variables);
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
  const { albums } = await request(GRAPHQL_URL, query, variables);
  return albums;
};

export const getCourseById = async (id: number): Promise<any> => {
  const query = gql`
    query courseQuery($id: Int!) {
      course(id: $id) {
        id
        title
        description
        topic
        url
      }
    }
  `;

  const variables = { id };
  const data = await request(GRAPHQL_URL, query, variables);
  return data.course;
};
