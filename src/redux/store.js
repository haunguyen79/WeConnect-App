import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@redux/slices/authSlice";
import { rootApi } from "@services/rootApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(rootApi.middleware);
  },
});
