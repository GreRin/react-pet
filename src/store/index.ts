import { configureStore } from '@reduxjs/toolkit';
import { githubApi } from './github/github.api';
import { authApi } from './auth/auth.api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { githubReducer } from './github/github.slice';
import { themeReducer } from '../features/counter/theme-slice';

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    github: githubReducer,
    [authApi.reducerPath]: authApi.reducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware, authApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
