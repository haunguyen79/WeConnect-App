import { useMediaQuery, useTheme } from "@mui/material";
import { logOut as logOutAction } from "@redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
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

export const useUserInfo = () => {
  return useSelector((state) => state.auth.userInfo);
};

export const useDetectLayout = () => {
  const theme = useTheme();
  const isMediumLayout = useMediaQuery(theme.breakpoints.down("md"));

  return { isMediumLayout };
};
