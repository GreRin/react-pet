import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Breed {
  id: string;
  name: string;
  image: {
    url: string;
  };
}

export const dogApiSlice = createApi({
  reducerPath: 'apiDogs',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.TheDogAPI.com/v1',
    prepareHeaders(headers) {
      headers.set('x-api-key', <string>process.env.REACT_APP_DOGS_API_KEY);
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchBreeds: builder.query<Breed[], number | void>({
        query(limit = 10) {
          return `/breeds?limit=${limit}`;
        },
      }),
    };
  },
});

export const { useFetchBreedsQuery } = dogApiSlice;
