import React from "react";

import { AppBar, Toolbar, InputBase, Grid, MenuItem } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { alpha, makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "./store/auth-slice";

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(3),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    color: "white",
    padding: "0 10px",
    fontSize: "20px",
  },
  inputInput: {
    color: "white",
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    dispatch(authActions.logOut());
  };

  return (
    <AppBar position="static" classes={{ root: classes.appBar }}>
      <Toolbar>
        <Grid container>
          <Grid container item xs={8}>
            <MenuItem
              color="textPrimary"
              to="/home"
              classes={{ root: classes.link }}
              component={Link}
            >
              Dashboard
            </MenuItem>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            {isAuth ? (
              <MenuItem
                color="textPrimary"
                to="/wallet"
                classes={{ root: classes.link }}
                component={Link}
              >
                Wallet
              </MenuItem>
            ) : null}
          </Grid>
          <Grid container item xs={4} justifyContent="flex-end">
            {!isAuth ? (
              <>
                <MenuItem
                  to="/login"
                  classes={{ root: classes.link }}
                  component={Link}
                >
                  Login
                </MenuItem>
                <MenuItem
                  color="textPrimary"
                  to="/register"
                  classes={{ root: classes.link }}
                  component={Link}
                >
                  Register
                </MenuItem>
              </>
            ) : (
              <MenuItem
                color="textPrimary"
                to="/home"
                classes={{ root: classes.link }}
                component={Link}
                onClick={logout}
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

export default Header;
