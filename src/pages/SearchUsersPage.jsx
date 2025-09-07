import UserCard from "@components/UserCard";
import { useUserInfo } from "@hooks/index";
import { useSearchUsersQuery } from "@services/rootApi";
import React from "react";
import { useLocation } from "react-router-dom";

const SearchUsersPage = () => {
  const location = useLocation();
  const { _id } = useUserInfo();
  const searchQuery = location?.state?.searchTerm;

  const { data, isFetching, isError, error } = useSearchUsersQuery({
    limit: 10,
    offset: 0,
    searchQuery,
  });

  console.log({ "searchQuery:": searchQuery });
  console.log({ "data:": data });
  console.log({
    "isFetching:": isFetching,
    "isError:": isError,
    "error:": error,
  });

  return (
    <div className="app-container flex-col">
      <p className="text-xl font-bold">Search</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {(data?.users || []).map((user) => (
          <UserCard
            key={user._id}
            id={user._id}
            fullName={user.fullName}
            isFriend={user.isFriend}
            requestSent={user.requestSent}
            requestReceived={user.requestReceived}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchUsersPage;
