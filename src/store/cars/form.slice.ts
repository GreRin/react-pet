import { createSlice } from '@reduxjs/toolkit';
import { carsAction } from './cars.slice';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    name: '',
    cost: 0,
  },
  reducers: {
    changeName(state, action) {
      state.name = action.payload;
    },
    changeCost(state, action) {
      state.cost = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(carsAction.addCar, (state, action) => {
      state.name = '';
      state.cost = 0;
    });
  },
});

export const formActions = formSlice.actions;
export const formReducer = formSlice.reducer;
