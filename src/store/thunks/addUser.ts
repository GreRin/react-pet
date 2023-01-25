import { createAsyncThunk } from '@reduxjs/toolkit';
import { environment } from '../../environments/environment';
import axios from 'axios';

const addUser = createAsyncThunk('users/add', async (body) => {
  const responce = await axios.post(`${environment.baseUrl}/users`, body);

  return responce.data;
});

export { addUser };
