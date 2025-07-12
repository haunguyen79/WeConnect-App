import Header from "@components/Header";
import { saveUserInfo } from "@redux/slices/authSlice";
import { useGetAuthUserQuery } from "@services/rootApi";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const dispatch = useDispatch();
  const response = useGetAuthUserQuery();
  console.log({ response });

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(saveUserInfo(response.data));
    }
  }, [dispatch, response.isSuccess, response.data]);

  if (response.isLoading) {
    return <div>Loading...</div>;

    /**
     * isLoading: No chi set thanh TRUE o lan Query dau tien
     * isFetching: No chi set thanh TRUE o lan Query dau tien va khi API duoc refetch
     */
  }

  // if (!response?.data?._id) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
