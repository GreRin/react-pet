import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

interface IPayload {
  name: string;
  cost: number;
}

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    searchTerm: '',
    data: [],
  },
  reducers: {
    changeSearchTerm(state: any, action: PayloadAction<IPayload>) {
      state.searchTerm = action.payload;
    },
    addCar(state: any, action: PayloadAction<IPayload>) {
      // Assumption:
      // action.payload === { name: 'ab', cost: 140 }
      state.data.push({
        name: action.payload.name,
        cost: action.payload.cost,
        id: nanoid(),
      });
    },
    removeCar(state: any, action: PayloadAction<IPayload>) {
      // Assumption:
      // action.payload === the id of the car we want to remove
      const updated = state.data.filter((car: any) => {
        return car.id !== action.payload;
      });
      state.data = updated;
    },
  },
});

export const carsAction = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
