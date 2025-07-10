import styled from "@emotion/styled";
import { useDetectLayout } from "@hooks/index";
import {
  Close,
  Groups,
  Home,
  Lock,
  Message,
  People,
  Translate,
} from "@mui/icons-material";
import {
  Drawer,
  IconButton,
  List,
  ListSubheader,
} from "@mui/material";
import { toggleDrawer } from "@redux/slices/settingsSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListStyled = styled(List)`
  padding: 16px;
  border-radius: 4px;
  gap: 4px;
`;

const SidebarContent = () => {
  return (
    <div className="flex w-64 flex-col gap-4">
      <ListStyled className="flex flex-col bg-white px-4 py-3 shadow">
        <Link to="/" className="flex items-center gap-1">
          <Home fontSize="small" />
          New Feeds
        </Link>
        <Link to="/messages " className="flex items-center gap-1">
          <Message fontSize="small" /> Messenger
        </Link>
        <Link to="/friends" className="flex items-center gap-1">
          <People fontSize="small" /> Friends
        </Link>
        <Link to="/groups" className="flex items-center gap-1">
          <Groups fontSize="small" />
          Groups
        </Link>
      </ListStyled>

      <ListStyled className="flex flex-col bg-white px-4 py-3 shadow">
        <ListSubheader className="mb-2 !p-0 !leading-none">
          Settings
        </ListSubheader>
        <Link to="/setting/account" className="flex items-center gap-1">
          <Lock fontSize="small" /> Account
        </Link>
        <Link to="/setting/languages" className="flex items-center gap-1">
          <Translate fontSize="small" /> Languages
        </Link>
      </ListStyled>
    </div>
  );
};

const Sidebar = () => {
  const {isMediumLayout} = useDetectLayout()
  const isShowDrawer = useSelector((state) => state.settings.isShowDrawer);
  const dispatch = useDispatch();

  console.log({ isMediumLayout });

  return isMediumLayout ? (
    <Drawer
      open={isShowDrawer}
      onClose={() => dispatch(toggleDrawer())}
      classes={{ paper: "p-4 flex flex-col gap-4 !bg-dark-200" }}
    >
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src="/weconnect-logo.png" className="h-8 w-8" />
        </Link>

        <IconButton onClick={() => dispatch(toggleDrawer())}>
          <Close />
        </IconButton>
      </div>
      <SidebarContent />
    </Drawer>
  ) : (
    <SidebarContent />
  );
};

export default Sidebar;
