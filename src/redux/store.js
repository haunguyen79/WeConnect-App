import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@redux/slices/authSlice";
import snackbarReducer from "@redux/slices/snackbarSlice";
import { rootApi } from "@services/rootApi";
import storage from "redux-persist/lib/storage";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [rootApi.reducerPath], 
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    snackbar: snackbarReducer,
    [rootApi.reducerPath]: rootApi.reducer,
  }),
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(rootApi.middleware);
  },
});

export const persistor = persistStore(store);
