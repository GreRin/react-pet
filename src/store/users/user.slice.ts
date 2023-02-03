import { ActionReducerMapBuilder, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { fetchUsers } from '../thunks/fetchUsers';
import { addUser } from '../thunks/addUser';
import { removeUser } from '../thunks/removeUser';
import { IUser } from '../../interfaces';

export interface IRequestStateBase {
  data: any;
  isLoading: boolean;
  error: any;
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
    // Fetch users
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

    // Add user
    builder.addCase(
      addUser.pending,
      (
        state: IRequestStateBase,
        action: PayloadAction<undefined, string, { arg: void; requestId: string; requestStatus: 'pending' }, never>
      ) => {
        state.isLoading = true;
      }
    );
    builder.addCase(addUser.fulfilled, (state: IRequestStateBase, action: any) => {
      state.isLoading = false;
      state.data.push(action.payload.user);
    });
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

    //  Remove user
    builder.addCase(
      removeUser.pending,
      (
        state: IRequestStateBase,
        action: PayloadAction<undefined, string, { arg: void; requestId: string; requestStatus: 'pending' }, never>
      ) => {
        state.isLoading = true;
      }
    );
    builder.addCase(removeUser.fulfilled, (state: IRequestStateBase, action: any) => {
      state.isLoading = false;
      console.log(action.payload);
      state.data = state.data.filter((user: IUser): boolean => {
        return user.id !== action.payload.id;
      });
    });
    builder.addCase(
      removeUser.rejected,
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
