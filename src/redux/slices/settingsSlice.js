import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowDrawer: true, // Trạng thái hiển thị của drawer
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isShowDrawer = !state.isShowDrawer; // Đảo ngược trạng thái hiển thị của drawer
    },
  },
});

// Xuất ra Action toggleDrawer để có thể sử dụng trong các component khác
// Action này sẽ được dispatch để thay đổi trạng thái của drawer
export const { toggleDrawer } = settingsSlice.actions; // Trả ra tất cả các Action được khai báo trong reducer
export default settingsSlice.reducer;
