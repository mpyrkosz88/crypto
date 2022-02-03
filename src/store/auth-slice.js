import { createSlice, current } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
    localId: null,
  },
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    logOut(state, action) {
      state.isLoggedIn = false;
      state.token = null;
      state.localId = null;
    },
    checkAuth(state, action) {
      const token = action.payload.token;
      const localId = action.payload.localId;
      if (!token) {
        state.isLoggedIn = false;
        state.token = null;
        state.localId = null;
      } else {
        state.isLoggedIn = true;
        state.token = token;
        state.localId = localId;
      }
    },
  },
});
export const authActions = authSlice.actions;

export default authSlice;
