import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client';
// import { request } from 'graphql-request';
import { GRAPHQL_URL } from '../constants/constants';
import { getAccessToken } from '../common/common';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
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
  },
});

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

  // Endpoint with raphql-request
  // const { getAllCourses } = await request(GRAPHQL_URL, query);
  // Endpoint with @apollo/client
  const context = {
    headers: { Cookies: getAccessToken() },
  };
  const {
    data: { getAllCourses },
  } = await client.query({ query, context });
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
  // const { course } = await request(GRAPHQL_URL, query, variables);
  // Endpoint with @apollo/client
  const context = {
    headers: { Cookies: getAccessToken() },
  };
  const {
    data: { course },
  } = await client.query({ query, variables, context });
  return course;
};
