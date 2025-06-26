import { AccountCircle, Notifications, Search } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={handleMenuClose}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem>Logout</MenuItem>
    </Menu>
  );

  const handleUserProfileClick = (event) => {
    setAnchorEl(event.target);
  };

  return (
    <div>
      <AppBar color="white" position="static" className="py-4">
        <Toolbar className="!min-h-fit justify-between">
          <div className="flex items-center gap-4">
            <img src="/weconnect-logo.png" className="h-8 w-8" />
            <div className="flex items-center gap-1">
              <Search />
              <TextField
                variant="standard"
                name="search"
                placeholder="Search"
                slotProps={{
                  input: { className: "h-10 px-3 py-2" },
                  htmlInput: { className: "!p-0" },
                }}
              />
            </div>
          </div>

          <div>
            <IconButton size="medium">
              <Badge badgeContent={4} color="error" >
                <Notifications />
              </Badge>
            </IconButton>

            <IconButton size="medium" onClick={handleUserProfileClick}>
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </div>
  );
};

export default Header;
