import { gql } from '@apollo/client';

export const GET_ALL_COURSES = gql`
  query {
    getAllCourses {
      title
      author
      description
      topic
      url
    }
  }
`;
