import { useGetAuthUserQuery } from "@services/rootApi";
import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const response = useGetAuthUserQuery();
  console.log({ response });
  
  if (response.isLoading) {
    return <div>Loading...</div>;

    /**
     * isLoading: No chi set thanh TRUE o lan Query dau tien
     * isFetching: No chi set thanh TRUE o lan Query dau tien va khi API duoc refetch
     */
  }

  if (!response?.data?._id) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Link to="/">Home Page</Link>
      <Link to="/messages">Messages Page</Link>
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
