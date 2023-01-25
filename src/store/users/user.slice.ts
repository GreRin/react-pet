import { ActionReducerMapBuilder, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { fetchUsers } from '../thunks/fetchUsers';
import { addUser } from '../thunks/addUser';

export interface IRequestStateBase {
  data: any[];
  isLoading: boolean;
  error: any[];
}

const userSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: function (builder: ActionReducerMapBuilder<any>) {
    builder.addCase(
      fetchUsers.pending,
      (
        state: IRequestStateBase,
        action: PayloadAction<undefined, string, { arg: void; requestId: string; requestStatus: 'pending' }, never>
      ) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      fetchUsers.fulfilled,
      (
        state: IRequestStateBase,
        action: PayloadAction<any[], string, { arg: void; requestId: string; requestStatus: 'fulfilled' }, never>
      ) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      fetchUsers.rejected,
      (
        state: any,
        action: PayloadAction<
          unknown,
          string,
          { arg: void; requestId: string; requestStatus: 'rejected'; aborted: boolean; condition: boolean } & (
            | { rejectedWithValue: true }
            | ({ rejectedWithValue: false } & {})
          ),
          SerializedError
        >
      ) => {
        state.isLoading = false;
        state.error = action.error;
      }
    );

    builder.addCase(
      addUser.pending,
      (
        state: IRequestStateBase,
        action: PayloadAction<undefined, string, { arg: void; requestId: string; requestStatus: 'pending' }, never>
      ) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      addUser.fulfilled,
      (
        state: IRequestStateBase,
        action: PayloadAction<any[], string, { arg: void; requestId: string; requestStatus: 'fulfilled' }, never>
      ) => {
        state.isLoading = false;
        state.data.push(action.payload);
      }
    );
    builder.addCase(
      addUser.rejected,
      (
        state: any,
        action: PayloadAction<
          unknown,
          string,
          { arg: void; requestId: string; requestStatus: 'rejected'; aborted: boolean; condition: boolean } & (
            | { rejectedWithValue: true }
            | ({ rejectedWithValue: false } & {})
          ),
          SerializedError
        >
      ) => {
        state.isLoading = false;
        state.error = action.error;
      }
    );
  },
});

export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;
