import { createSlice } from "@reduxjs/toolkit";
// import data from "../data";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    enteredFilter: [],
    isInitial: true,
  },
  reducers: {
    loadProducts(state, action) {
      state.items = action.payload.items;
      state.isInitial = false;
    },
    setEnteredFilter(state, action) {
      state.enteredFilter = action.payload.toLowerCase();
    },
    addItemToWallet(state, action) {
      const id = action.payload.id;
      const existingItem = state.items.find((item) => item.id === id);
      existingItem.inWallet = true;
    },
    removeItemFromWallet(state, action) {
      const id = action.payload.id;
      const existingItem = state.items.find((item) => item.id === id);
      existingItem.inWallet = false;
    },
  },
});
export const productsActions = productsSlice.actions;

export default productsSlice;
