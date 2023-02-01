import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import boardReducer from '../features/boards/boardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardReducer,
  },
});
