// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartItemSlice';
import localStorageMiddleware from './localStoreageMiddleware';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
