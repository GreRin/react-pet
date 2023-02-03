import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { environment } from '../../environments/environment';

const removeUser = createAsyncThunk('users/remove', async (user: any) => {
  await axios.delete(`${environment.baseUrl}/users/${user.item.id}`);

  return user;
});

export { removeUser };
