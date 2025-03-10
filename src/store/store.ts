import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userInfoReducer from './slices/userInfoSlice';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: userInfoReducer,
  },
});

export default store;
