import { configureStore } from '@reduxjs/toolkit';
import { githubApi } from './github/github.api';
import { authApi } from './auth/auth.api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { githubReducer } from './github/github.slice';
import { themeReducer } from '../features/counter/theme-slice';
import { dogApiSlice } from '../features/dog/dog-api-slice';
import { songReducer } from './songs/songs.slice';
import { carsReducer } from './cars/cars.slice';
import { formReducer } from './cars/form.slice';

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    github: githubReducer,
    [authApi.reducerPath]: authApi.reducer,
    theme: themeReducer,
    [dogApiSlice.reducerPath]: dogApiSlice.reducer,
    songs: songReducer,
    cars: carsReducer,
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware, authApi.middleware, dogApiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
