// DUCKS pattern
import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  theme: boolean;
}

const initialState: ThemeState = {
  theme: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    //  theme handler
    themeHandler(state) {
      // it's ok to do this because immer makes it immutable
      // under the hood
      state.theme = !state.theme;
    },
  },
});

export const themeActions = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
