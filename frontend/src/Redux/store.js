import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productApi } from '../services/Product';
import { UserApi } from '../services/User'; // Assuming UserApi is properly imported and named
import cartReducer from './cartSlice';

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  }
};

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, UserApi.middleware),
  preloadedState: initialState, // You can provide the initial state here
});

setupListeners(store.dispatch);
