import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// API
import { authApi } from '../services/authApi';
import { forecaApi } from '../services/forecaApi';

// Reducers
import themeReducer from '../features/theme/themeSlice';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [forecaApi.reducerPath]: forecaApi.reducer,
    auth: authReducer,
    theme: themeReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, forecaApi.middleware)
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
