import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '@service/client';

export const fetchRegistration = createAsyncThunk(`auth/register`, async (payload) => {
  const { data } = await client.post(`auth/register`, payload);
  return data;
});

export const fetchLogin = createAsyncThunk(`auth/login`, async (payload) => {
  const { data } = await client.post(`auth/login`, payload);
  return data;
});

// export const fetchMe = createAsyncThunk(`auth/me`, async () => {
//   const { data } = await authClient().get(`/auth/me`);
//   return data;
// });

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('auth-token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegistration.pending, (state) => {
      state.data = null;
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(fetchRegistration.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'fulfilled';
      state.error = null;
    });
    builder.addCase(fetchRegistration.rejected, (state, action) => {
      state.data = null;
      state.status = 'rejected';
      state.error = action.error.message;
    });
    builder.addCase(fetchLogin.pending, (state) => {
      state.data = null;
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'fulfilled';
      state.error = null;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.data = null;
      state.status = 'rejected';
      state.error = action.error;
    });
    // builder.addCase(fetchMe.pending, (state) => {
    //   state.data = null;
    //   state.status = 'pending';
    //   state.error = null;
    // });
    // builder.addCase(fetchMe.fulfilled, (state, action) => {
    //   state.data = action.payload;
    //   state.status = 'fulfilled';
    //   state.error = null;
    // });
    // builder.addCase(fetchMe.rejected, (state, action) => {
    //   state.data = null;
    //   state.status = 'rejected';
    //   state.error = action.error.message;
    // });
  },
});

export const userReducer = userSlice.reducer;

export const { logout } = userSlice.actions;
