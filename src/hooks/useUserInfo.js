import React from "react";
import { useSelector } from "react-redux";

export const useUserInfo = () => {
  return useSelector((state) => state.auth.userInfo);
};
