import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { GRAPHQL_URL } from '../constants/constants';
import { setContext } from '@apollo/client/link/context';
import { getAccessToken } from '../common/common';

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

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    },
    mutate: {
      fetchPolicy: 'network-only',
    },
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
