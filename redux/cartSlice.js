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
            const product = action.payload;
            const existingProduct = state.products.find((item) => item._id === product._id);

            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                state.products.push({ ...product, quantity: product.quantity });
            }

            state.quantity += product.quantity;
            state.total = parseFloat((state.total + product.price * product.quantity).toFixed(2));
        },
        removeProduct(state, action) {
            const productId = action.payload;
            const product = state.products.find((item) => item._id === productId);
            
            if (product) {
                state.quantity -= product.quantity;
                state.total = parseFloat((state.total - product.price * product.quantity).toFixed(2));
                state.products = state.products.filter((item) => item._id !== productId);
            }
        },
        increaseQuantity(state, action) {
            const productId = action.payload;
            const product = state.products.find((item) => item._id === productId);

            if (product) {
                product.quantity += 1;
                state.quantity += 1;
                state.total = parseFloat((state.total + product.price).toFixed(2));
            }
        },
        decreaseQuantity(state, action) {
            const productId = action.payload;
            const product = state.products.find((item) => item._id === productId);

            if (product && product.quantity > 1) {
                product.quantity -= 1;
                state.quantity -= 1;
                state.total = parseFloat((state.total - product.price).toFixed(2));
            }
        },
        reset(state) {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
    },
});

export const { addProduct, removeProduct, increaseQuantity, decreaseQuantity, reset } = cartSlice.actions;
export default cartSlice.reducer;
