import { Outlet } from "react-router-dom";

import { Suspense } from "react";
// Supports weights 100-900

import "@fontsource-variable/public-sans";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "@redux/slices/snackbarSlice";
const RootLayout = () => {
  const dispatch = useDispatch();

  const { open, type, message } = useSelector((state) => {
    console.log("RootLayout", state);
    return state.snackbar;
  });

  return (
    <div>
      <Suspense fallback={<p>Loading</p>}>
        <Outlet />
      </Suspense>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => dispatch(closeSnackbar)}
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
