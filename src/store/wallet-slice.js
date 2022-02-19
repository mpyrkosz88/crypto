import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    loadWallet(state, action) {
      state.items = action.payload;
    },
    changeWalletStatus(state, action) {
      state.changed = false;
    },
    addItemToWallet(state, action) {
      const newItem = action.payload;
      state.changed = true;
      if (newItem.items !== null) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          tokenName: newItem.tokenName,
          tokenId: newItem.tokenId,
          chain: newItem.chain,
          imageUrl: newItem.imageUrl,
          price: newItem.price,
          round: newItem.round,
          listingDate: newItem.listingDate,
          inWallet: newItem.inWallet,
          vesting: newItem.vesting,
        });
      }
    },
    removeItemFromWallet(state, action) {
      const id = action.payload.id;
      state.changed = true;
      state.items = state.items.filter((item) => item.id !== id);
    },
    addTokensToWallet(state, action) {
      const tokenHoldings = action.payload.enteredTokens;
      state.items.find((item) => item.id === action.payload.id).tokenHoldings =
        tokenHoldings;
      state.changed = true;
    },
  },
});
export const walletActions = walletSlice.actions;

export default walletSlice;
