import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { environment } from '../../environments/environment';

const pause = (duration: number): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get(`${environment.baseUrl}/users`);

  await pause(500);

  return response.data;
});

export { fetchUsers };
