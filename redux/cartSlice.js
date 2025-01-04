import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            const product = action.payload;

            const existingProduct = state.products.find(item => item.uniqueKey === product.uniqueKey);

            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                state.products.push(product);
            }

            state.quantity += product.quantity;
            state.total = parseFloat(state.total) + (parseFloat(product.price) * product.quantity);
        },

        removeProduct: (state, action) => {
            const productKey = action.payload;
            const product = state.products.find(item => item.uniqueKey === productKey);

            if (product) {
                state.quantity -= product.quantity;
                state.total -= parseFloat(product.price) * product.quantity;
                state.products = state.products.filter(item => item.uniqueKey !== productKey);
            }
        },

        increaseQuantity: (state, action) => {
            const productKey = action.payload;
            const product = state.products.find(item => item.uniqueKey === productKey);

            if (product) {
                product.quantity += 1;
                state.quantity += 1;
                state.total = parseFloat(state.total) + parseFloat(product.price);
            }
        },

        decreaseQuantity: (state, action) => {
            const productKey = action.payload;
            const product = state.products.find(item => item.uniqueKey === productKey);

            if (product && product.quantity > 1) { // Quantity cannot go below 1
                product.quantity -= 1;
                state.quantity -= 1;
                state.total = parseFloat(state.total) - parseFloat(product.price);
            }
        },

        reset: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
    },
});

export const { addProduct, removeProduct, increaseQuantity, decreaseQuantity, reset } = cartSlice.actions;
export default cartSlice.reducer;
