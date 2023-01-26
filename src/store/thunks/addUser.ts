import { createAsyncThunk } from '@reduxjs/toolkit';
import { environment } from '../../environments/environment';
import axios from 'axios';

const addUser = createAsyncThunk('users/add', async ({ props }: any) => {
  console.log(props);
  const responce = await axios.post(`${environment.baseUrl}/users`, props);

  return responce.data;
});

export { addUser };
