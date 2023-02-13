import { gql } from '@apollo/client';

const ALBUM_DETAILS_FRAGMENT = gql`
  fragment AlbumDetails on Album {
    _id
    userId
    title
    foto {
      _id
      title
      ref
    }
    createdAt
    __typename
  }
`;

export const ALBUMS_QUERY = gql`
  mutation getAllAlbums($userId: String) {
    getAllAlbums(userId: $userId) {
      ...AlbumDetails
    }
  }
  ${ALBUM_DETAILS_FRAGMENT}
`;

export const GET_ALBUM_BY_ID = gql`
  mutation getAlbumById($albumId: String) {
    getAlbumById(_id: $albumId) {
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

export const CREATE_FOTO = gql`
  mutation createFoto($albumId: String!, $title: String, $ref: String) {
    createFoto(_id: $albumId, title: $title, ref: $ref) {
      _id
      title
      ref
    }
  }
`;

export const DELETE_ALBUM = gql`
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
