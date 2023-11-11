import {combineReducers, createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        loading: true,
        error: false,
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const isItemExist = state.cartItems.find((i) => i.product === item.product);

            if (isItemExist) {
                state.cartItems = state.cartItems.map((i) =>
                    i.product === isItemExist.product ? item : i
                );
            } else {
                state.cartItems.push(item);
            }
        },
        removeCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i.product !== action.payload);
        },
    },
});

export const { addToCart, removeCartItem  } = cartSlice.actions; // Define and export the action

//export default cartSlice.reducer; // Export the reducer

export default combineReducers({
    cart: cartSlice.reducer,
});
