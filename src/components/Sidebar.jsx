import styled from "@emotion/styled";
import { Groups, Home, Lock, Message, People, Translate } from "@mui/icons-material";
import { List, ListSubheader } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ListStyled = styled(List)`
  padding: 16px;
  border-radius: 4px;
  gap: 4px;
`;

const Sidebar = () => {
  return (
    <div className="w-64 flex flex-col gap-4">
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
        <ListSubheader className="!p-0 !leading-none mb-2">Settings</ListSubheader>
        <Link to="/setting/account" className="flex items-center gap-1">
          <Lock fontSize="small"/> Account
        </Link>
        <Link to="/setting/languages" className="flex items-center gap-1">
          <Translate fontSize="small"/> Languages
        </Link>
      </ListStyled>
    </div>
  );
};

export default Sidebar;
