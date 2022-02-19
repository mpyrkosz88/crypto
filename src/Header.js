import React from "react";
import { Box } from "@mui/material";

import TopNav from "./Navigation/TopNav";
import SideNav from "./Navigation/SideNav";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "./store/auth-slice";

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("localId");
    dispatch(authActions.logOut());
  };

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <TopNav isAuth={isAuth} logout={logout} />
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <SideNav isAuth={isAuth} logout={logout} />
      </Box>
    </>
  );
};

export default Header;
