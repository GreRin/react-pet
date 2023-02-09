import { request, gql } from 'graphql-request';

const GRAPHQL_URL = 'http://localhost:4000/api/graphql';

export const getCourses = async (): Promise<any> => {
  const query = gql`
    query {
      getAllCourses {
        id
        title
        description
      }
    }
  `;

  const data = await request(GRAPHQL_URL, query);
  return data.getAllCourses;
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
