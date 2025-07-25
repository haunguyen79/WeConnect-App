import { Outlet } from "react-router-dom";

import { Suspense } from "react";
// Supports weights 100-900

import "@fontsource-variable/public-sans";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "@redux/slices/snackbarSlice";
import Loading from "@components/Loading";
const RootLayout = () => {
  const dispatch = useDispatch();

  const { open, type, message } = useSelector((state) => {
    console.log("RootLayout", state);
    return state.snackbar;
  });

  return (
    <div className="text-dark-100">
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => dispatch(closeSnackbar())} // gọi hàm => trả về action object
        //Redux action creator là 1 function → phải gọi nó để nhận action object
        //React Redux Toolkit (RTK) yêu cầu phải gọi hàm action creator, ngay cả khi không có payload
      >
        <Alert
          // onClose={handleClose}
          severity={type} // "success", "info", "warning", "error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RootLayout;
