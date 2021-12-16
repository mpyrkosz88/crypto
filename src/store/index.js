import { configureStore } from "@reduxjs/toolkit";

import walletSlice from "./wallet-slice";
import productsSlice from "./products-slice";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    wallet: walletSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
