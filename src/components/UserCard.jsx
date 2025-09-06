import { MessageOutlined, PersonAdd } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ isFriend, fullName }) => {
  
  return (
    <div className="card flex flex-col items-center">
      <Avatar className="!bg-primary mb-3 !h-12 !w-12">
        {fullName?.[0]?.toUpperCase()}
      </Avatar>
      <Link>
        <p className="text-lg font-bold">{fullName}</p>
      </Link>

      <div className="mt-4">
        {isFriend ? (
          <Button variant="contained" size="small">
            <MessageOutlined className="mr-1" size="small" /> Message
          </Button>
        ) : (
          <Button variant="outlined">
            <PersonAdd className="mr-1" size="small" /> Add Friend
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
