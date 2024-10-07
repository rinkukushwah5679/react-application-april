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
    const result = await fetch2(`${BASE_URL}/users/sign_up`, body);
    return result;
  } catch (error) {
    throw new Error('Error signing up user: ' + error.message);
  }
});

export const signinUser = createAsyncThunk('signinUser', async (body) => {
  try {

    const result = await fetch2(`${BASE_URL}/users/login`, body);
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
        if (action.payload.errors && action.payload.errors !== null) {
          if (action.payload.errors.email && (action.payload.errors.email !== null)){
            state.message = "Email " + action.payload.errors.email.join(", ");
          } else if (action.payload.errors.password && (action.payload.errors.password !== null)){
            state.message = "Password " + action.payload.errors.password.join(", ");
          }
        } else {
          state.message = "successfull sign up";
          state.user = action.payload.data;
          localStorage.setItem('login_user', JSON.stringify(action.payload.data));
        }
      })
      .addCase(signupUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.errors != null) {
          state.message = action.payload.errors;
        } else {
          state.message = "successfull login";
          state.user = action.payload.data;
          localStorage.setItem('login_user', JSON.stringify(action.payload.data));
        }
      })
      .addCase(signinUser.pending, (state, action) => {
        state.loading = true;
      });
  },
});

export default authReducer.reducer;
