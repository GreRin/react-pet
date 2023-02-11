import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { environment } from '../../environments/environment';

const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get(`${environment.baseUrl}/users`, { withCredentials: true });

  return response.data;
});

export { fetchUsers };
