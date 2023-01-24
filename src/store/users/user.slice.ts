import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
});

export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;
