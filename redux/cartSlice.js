import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct(state, action) {
            state.products.push(action.payload);
            state.quantity += action.payload.quantity;
            const newTotal = state.total + action.payload.price * action.payload.quantity;
            state.total = parseFloat(newTotal.toFixed(2));
        },
        reset(state) {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
    },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
