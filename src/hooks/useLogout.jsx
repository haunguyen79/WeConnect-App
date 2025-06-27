import { logOut as logOutAction } from "@redux/slices/authSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    // Dispatch the logout action
    dispatch(logOutAction());

    // Navigate to the login page
    navigate("/login", { replace: true }); //replace: true to prevent going back to the previous page, clears the history stack
  };

  return { logOut };
};
