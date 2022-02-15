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
  },
});
export const productsActions = productsSlice.actions;

export default productsSlice;
