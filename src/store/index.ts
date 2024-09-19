import { configureStore, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isLogin: boolean;
};
const initialState: AuthState = {
  isLogin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
    },
    login: (state) => {
      state.isLogin = true;
    },
  },
});

export const selectAuth = (state: any) => state.auth;

export const { logout, login } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
