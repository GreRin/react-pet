import { createAsyncThunk } from '@reduxjs/toolkit';
import { environment } from '../../environments/environment';
import axios from 'axios';

const addUser = createAsyncThunk('users/add', async ({ props }: any) => {
  const response = await axios.post(`${environment.baseUrl}/users`, props);

  return response.data;
});

export { addUser };
