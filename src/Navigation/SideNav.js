import * as React from "react";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 240;

const SideNav = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div onClick={handleDrawerToggle}>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button to="/home" component={Link}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {props.isAuth ? (
          <ListItem button to="/wallet" component={Link}>
            Wallet
          </ListItem>
        ) : null}
      </List>
      <Divider />
      <List>
        {!props.isAuth ? (
          <>
            <ListItem button to="/login" component={Link}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button to="/register" component={Link}>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        ) : (
          <ListItem button to="/home" component={Link} onClick={props.logout}>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <AppBar
      position="static"
      sx={{
        width: "100%",
        mb: "10px",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <SearchInput />
      </Toolbar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </AppBar>
  );
};

export default SideNav;
