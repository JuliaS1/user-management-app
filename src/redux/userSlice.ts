
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Definicja i eksport typu User
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

// Stan początkowy
interface UserState {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
};

// pobieranie z API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    filterUsers: (state, action: PayloadAction<{ name: string; username: string; email: string; phone: string }>) => {
      const { name, username, email, phone } = action.payload;
      state.filteredUsers = state.users.filter(
        (user) =>
          user.name.toLowerCase().includes(name.toLowerCase()) &&
          user.username.toLowerCase().includes(username.toLowerCase()) &&
          user.email.toLowerCase().includes(email.toLowerCase()) &&
          user.phone.toLowerCase().includes(phone.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Coś poszło nie tak.';
      });
  },
});

export const { filterUsers } = userSlice.actions;
export default userSlice.reducer;
