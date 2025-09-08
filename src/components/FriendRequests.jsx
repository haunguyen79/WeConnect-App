import { Check, Close } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import { useGetPendingFriendRequestsQuery } from "@services/rootApi";
import React from "react";

const FriendRequestsItem = ({ fullName }) => {
  return (
    <div className="flex gap-2">
      <Avatar className="!bg-primary">{fullName?.[0].toUpperCase()}</Avatar>
      <div>
        <p className="font-bold">{fullName}</p>
        <div className="mt-2 !space-x-1">
          <Button variant="contained" size="small">
            <Check className="mr-1" fontSize="small" /> Accept
          </Button>

          <Button variant="outlined" size="small" className="ml-2">
            <Close className="mr-1" fontSize="small" /> Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

const FriendRequests = () => {
  const { data = [], isFetching } = useGetPendingFriendRequestsQuery();
  console.log({ data, isFetching });

  return (
    <div className="card">
      <p className="mb-4 font-bold">Friend Requests</p>
      <div className="space-y-4">
        {data.slice(0, 3).map((user) => (
          <FriendRequestsItem
            key={user._id}
            fullName={user.fullName}
            id={user._id}
          />
        ))}
      </div>
    </div>
  );
};

export default FriendRequests;
