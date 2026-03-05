import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    original_total: 0,
    final_total: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (current_state, { payload }) => {
            current_state.items.push({ ...payload, qty: 1 });
            current_state.original_total += Number(payload.original_price);
            current_state.final_total += Number(payload.final_price);
            localStorage.setItem("cart", JSON.stringify(current_state));
        },
        emptyCart: (current_state) => {
            current_state.items = [];
            current_state.original_total = 0;
            current_state.final_total = 0;
        },
        changeQtyHandler: (current_state, { payload }) => {
            console.log(payload)
            const cartItem = current_state.items.find((item) => item.id === payload.id);

            if (cartItem) {
                if (payload.flag == 1) {
                    cartItem.qty++
                } else {
                    cartItem.qty--
                }
            }
            current_state.original_total += Number(payload.original_price);
            current_state.final_total += Number(payload.final_price);
            localStorage.setItem("cart", JSON.stringify(current_state));

        },
        lsToCart: (current_state) => {
            const cart = JSON.parse(localStorage.getItem("cart"));
            if (cart) {
                current_state.items = cart.items;
                current_state.original_total = Number(cart.original_total);
                current_state.final_total = Number(cart.final_total);
            }
        }

    },
})

// Action creators are generated for each case reducer function
export const { addToCart, emptyCart, changeQtyHandler, lsToCart } = cartSlice.actions

export default cartSlice.reducer