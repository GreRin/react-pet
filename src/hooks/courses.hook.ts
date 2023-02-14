import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_COURSES, GET_COURSE_BY_ID } from '../graphql-query/query.list';
import { getAccessToken } from '../common/common';

export const useCourses = (): any => {
  const { data, loading, error } = useQuery(GET_ALL_COURSES);
  return {
    coursesData: data?.getAllCourses,
    loadingCourses: loading,
    error: error,
  };
};
