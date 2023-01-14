import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../app/store';

export interface AuthState {
  name: string | any;
  token: string | null;
}

const initialState: AuthState = {
  name: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string; name: string }>) => {
      const { payload } = action;

      localStorage.setItem(
        'user',
        JSON.stringify({
          name: payload.name,
          token: payload.token,
        })
      );
      state.name = payload.name;
      state.token = payload.token;
    },
    signOut: (state) => {
      localStorage.clear();
      state.name = null;
      state.token = null;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser, signOut } = authSlice.actions;

export default authSlice.reducer;
