import { Check, Close, MessageOutlined, PersonAdd } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ isFriend, fullName, requestSent, requestReceived }) => {
  
  function getActionButtons() {
    if (isFriend) {
      return (
        <Button variant="contained" size="small">
          <MessageOutlined className="mr-1" fontSize="small" /> Message
        </Button>
      );
    }
    if (requestSent) {
      return (
        <Button variant="contained" size="small" disabled>
          <Check className="mr-1" fontSize="small" /> Request Sent
        </Button>
      );
    }
    if (requestReceived) {
      return (
        <div>
          <Button variant="contained" size="small">
            <Check className="mr-1" fontSize="small" /> Accept
          </Button>

          <Button variant="contained" size="small" className="ml-2">
            <Close className="mr-1" fontSize="small" /> Cancel
          </Button>
        </div>
      );
    }
    return (
      <Button variant="outlined" size="small">
        <PersonAdd className="mr-1" fontSize="small" /> Add Friend
      </Button>
    );
  }

  return (
    <div className="card flex flex-col items-center">
      <Avatar className="!bg-primary mb-3 !h-12 !w-12">
        {fullName?.[0]?.toUpperCase()}
      </Avatar>
      <Link>
        <p className="text-lg font-bold">{fullName}</p>
      </Link>

      <div className="mt-4">{getActionButtons()}</div>
    </div>
  );
};

export default UserCard;
