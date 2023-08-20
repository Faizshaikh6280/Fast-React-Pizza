import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = new pizza
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizza id
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    incrementItemQuantity(state, action) {
      // payload = pizza id
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decrementItemQuantity(state, action) {
      // payload = pizza id
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;

      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearItem(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  decrementItemQuantity,
  incrementItemQuantity,
  clearItem,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalQuantity = (store) => {
  return store.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
};

export const getTotalPrice = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
export const getCart = (store) => store.cart.cart;
export const getItemQuanityById = function (id) {
  return function (store) {
    const item = store.cart.cart.find((item) => item.pizzaId === id);
    return item?.quantity ?? 0;
  };
};
