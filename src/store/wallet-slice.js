import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    items: [],
  },
  reducers: {
    addItemToWallet(state, action) {
      const newItem = action.payload;
      state.items.push({
        id: newItem.id,
        title: newItem.title,
        tokenName: newItem.tokenName,
        chain: newItem.chain,
        imageUrl: newItem.imageUrl,
        price: newItem.price,
        round: newItem.round,
        listingDate: newItem.listingDate,
        inWallet: newItem.inWallet,
      });
    },
    removeItemFromWallet(state, action) {
      const id = action.payload.id;
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
});
export const walletActions = walletSlice.actions;

export default walletSlice;
