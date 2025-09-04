import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@pages/RootLayout";
// import ModalProvider from "@context/ModalProvider";
import { lazy } from "react";
import { ThemeProvider } from "@mui/material";

import theme from "./configs/muiConfig";
import ProtectedLayout from "@pages/ProtectedLayout";
import AuthLayout from "@pages/auth/AuthLayout";
import RegisterPage from "@pages/auth/RegisterPage";
import LoginPage from "@pages/auth/LoginPage";
import OTPVerifyPage from "@pages/auth/OTPVerifyPage";
import { Provider } from "react-redux";
import { persistor, store } from "@redux/store";
import MessagePage from "@pages/MessagePage";
import { PersistGate } from "redux-persist/integration/react";
import Dialog from "@components/Dialog";
import Loading from "@components/Loading";
import SearchUsersPage from "@pages/SearchUsersPage";

const HomePage = lazy(() => import("@pages/HomePage"));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/messages",
            element: <MessagePage />,
          },
          {
            path: "/search/users",
            element: <SearchUsersPage />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/register",
            element: <RegisterPage />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/verify-otp",
            element: <OTPVerifyPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <ThemeProvider theme={theme}>
        {/* <ModalProvider> */}
        <RouterProvider router={router} />
        <Dialog />
        {/* </ModalProvider> */}
      </ThemeProvider>
    </PersistGate>
  </Provider>,
);
