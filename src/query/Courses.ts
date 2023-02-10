import { request, gql } from 'graphql-request';
import { environment } from '../environments/environment';

const GRAPHQL_URL = `${environment.baseUrl}/graphql`;

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

  const { getAllCourses } = await request(GRAPHQL_URL, query);
  return getAllCourses;
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
  const { course } = await request(GRAPHQL_URL, query, variables);
  return course;
};
