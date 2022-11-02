import { configureStore } from '@reduxjs/toolkit';
import { githubApi } from './github/github.api';

export const store = configureStore({
  reducer: <any>{
    [githubApi.reducerPath]: githubApi.reducerPath,
  },
});
