import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY4NGFhNmNlYzA1MTZiOTUzMjAxYjk4YSIsImVtYWlsIjoiaGF1aG9uZ3V5ZW4yMDAxQGdtYWlsLmNvbSJ9LCJpYXQiOjE3NDk3MzEyNjcsImV4cCI6MTc0OTczMjE2N30.IhgTVGefXjG9oyHSktRbheDSaDjHuFig06eHN078U80",
  // refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY4NGFhNmNlYzA1MTZiOTUzMjAxYjk4YSIsImVtYWlsIjoiaGF1aG9uZ3V5ZW4yMDAxQGdtYWlsLmNvbSJ9LCJpYXQiOjE3NDk3MzEyNjcsImV4cCI6MTc0OTc2MDA2N30.gn6UPNdy32451W12-sj70mypKPAeSOuHH2srYQXo-XQ",

  accessToken: null, // Lưu trữ accessToken
  refreshToken: null, // Lưu trữ refreshToken
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { login } = authSlice.actions; // Trả ra tất cả các Action được khai báo trong reducer
export default authSlice.reducer;
