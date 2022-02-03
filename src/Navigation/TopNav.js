import React from "react";

import { AppBar, Toolbar, Grid, MenuItem } from "@mui/material";

import { Link } from "react-router-dom";

import SearchInput from "./SearchInput";

const TopNav = (props) => {
  return (
    <AppBar position="static" sx={{ marginBottom: "10px" }}>
      <Toolbar>
        <Grid container>
          <Grid container item xs={8}>
            <MenuItem color="textPrimary" to="/home" component={Link}>
              Dashboard
            </MenuItem>
            <SearchInput />
            {props.isAuth ? (
              <MenuItem color="textPrimary" to="/wallet" component={Link}>
                Wallet
              </MenuItem>
            ) : null}
          </Grid>
          <Grid container item xs={4} justifyContent="flex-end">
            {!props.isAuth ? (
              <>
                <MenuItem to="/login" component={Link}>
                  Login
                </MenuItem>
                <MenuItem color="textPrimary" to="/register" component={Link}>
                  Register
                </MenuItem>
              </>
            ) : (
              <MenuItem
                color="textPrimary"
                to="/home"
                component={Link}
                onClick={props.logout}
              >
                Logout
              </MenuItem>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
