import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const reset = createAction('app/reset');

const songsSlice = createSlice({
  name: 'song',
  initialState: [],
  reducers: {
    addSong(state: any, action: PayloadAction<string>) {
      state.push(action.payload);
    },
    removeSong(state: any, action: PayloadAction<string>) {
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
    },
    reset(state: any, action: PayloadAction<string>) {
      return [];
    },
  },
  // We use extraReducers when we have another slice with similar action
  extraReducers(builder: any) {
    builder.addCase(reset, (state: any, action: PayloadAction<string>) => {
      return [];
    });
  },
});

export const songReducer = songsSlice.reducer;
export const songAction = songsSlice.actions;
