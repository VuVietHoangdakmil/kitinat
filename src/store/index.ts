import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

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

const rootReducer = combineReducers({
  auth: authSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
