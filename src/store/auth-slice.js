import { createSlice, current } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    logIn(state, action) {
      console.log(current(state));
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    logOut(state, action) {
      state.isLoggedIn = false;
      state.token = null;
    },
    checkAuth(state, action) {
      const token = action.payload;
      if (token === "1") {
        console.log("jestes zalogowany");
        state.isLoggedIn = true;
      } else {
        console.log("nie jestes zalogowany");
        state.isLoggedIn = false;
      }
    },
  },
});
export const authActions = authSlice.actions;

export default authSlice;
