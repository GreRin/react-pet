import { getAccessToken } from '../common/common';
import { GET_ALL_COURSES, GET_COURSE_BY_ID } from './query.list';
import { client } from './apollo.server';

export const getCourses = async (): Promise<any> => {
  const query = GET_ALL_COURSES;

  const context = {
    headers: { Cookies: getAccessToken() },
  };
  const {
    data: { getAllCourses },
  } = await client.query({ query, context });
  return getAllCourses;
};

export const getCourseById = async (id: number): Promise<any> => {
  const query = GET_COURSE_BY_ID;
  const variables = { id };
  const context = {
    headers: { Cookies: getAccessToken() },
  };
  const {
    data: { course },
  } = await client.query({ query, variables, context });
  return course;
};
