import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const { id, size } = action.payload;
            const itemInCart = state.cart.find((item) => item.id === id && item.size === size);
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        addToCartQuantity: (state, action) => {
            const { product, quantity, size, price } = action.payload;
            // console.log(product);

            const itemInCart = state.cart.find(
                (item) => item.id === product.id && item.size === size && item.price === price,
            );
            if (itemInCart) {
                itemInCart.quantity += quantity;
            } else {
                state.cart.push({ ...product, quantity, size, price });
                // console.log(product);
            }
            // console.log(quantity);
        },

        incrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload.id && item.size === action.payload.size);
            if (item) {
                item.quantity++;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload.id && item.size === action.payload.size);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--;
                }
            }
        },

        removeItem: (state, action) => {
            const { id, size } = action.payload;
            state.cart = state.cart.filter((item) => !(item.id === id && item.size === size));
        },
    },
});
export const cartReducer = cartSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, removeItem, addToCartQuantity } = cartSlice.actions;
