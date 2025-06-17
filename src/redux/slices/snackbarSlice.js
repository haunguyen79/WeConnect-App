import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false, // Trạng thái hiển thị của snackbar
  message: null, // Tin nhắn hiển thị trong snackbar
  type: "success", // Loại snackbar (info, success, error, warning)
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    // login: (state, action) => {
    //   state.accessToken = action.payload.accessToken;
    //   state.refreshToken = action.payload.refreshToken;
    // },
    openSnackbar: (state, action) => {
      state.open = true; // Mở snackbar
      state.message = action.payload.message; // Cập nhật tin nhắn
      state.type = action.payload.type || "success"; // Cập nhật loại, mặc định là success
    },
    closeSnackbar: () => {
      // state.open = false; // Đóng snackbar
      // state.message = null; // Xóa tin nhắn
      // state.type = "success"; // Đặt lại loại về mặc định

      return initialState; // Trả về trạng thái ban đầu
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions; // Trả ra tất cả các Action được khai báo trong reducer
export default snackbarSlice.reducer;
