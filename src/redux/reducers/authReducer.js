import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../config';

const initialState = {
  token: '',
  loading: false,
  user: null,
  message: '',
};

const fetch2 = async (api, body, token = '') => {
  const res = await fetch(api, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};


export const signupUser = createAsyncThunk('signupUser', async (body) => {
  try {
    const result = await fetch2(`${BASE_URL}/api/v1/sign_up`, body);
    return result;
  } catch (error) {
    throw new Error('Error signing up user: ' + error.message);
  }
});

export const signinUser = createAsyncThunk('signinUser', async (body) => {
  try {
    const result = await fetch2(`${BASE_URL}/api/v1/sign_in`, body);
    return result;
  } catch (error) {
    throw new Error('Error signing in user: ' + error.message);
  }
});

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === 401) {
          state.message = action.payload.data.errors;
        } else if (action.payload.status === 200) {
          state.message = action.payload.message;
          state.user = action.payload.data.user;
        }
      })
      .addCase(signupUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === 401) {
          state.message = action.payload.message;
        } else if (action.payload.status === 200) {
          state.message = action.payload.message;
          state.user = action.payload.data.user;
        }
      })
      .addCase(signinUser.pending, (state, action) => {
        state.loading = true;
      });
  },
});

export default authReducer.reducer;
