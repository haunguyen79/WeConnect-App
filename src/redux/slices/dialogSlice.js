import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  maxWidth: "xs",
  fullWidth: true,
  title: null,
  contentType: null,
  additionalData: {}, // Dữ liệu bổ sung cho nội dung
  // contentType: "NEW_POST_DIALOG", // Ví dụ: NEW_POST_DIALOG, USER_PROFILE_DIALOG,..
  actions: null,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state, action) => {
      return { ...state, ...action.payload, open: true };
    },
    closeDialog: () => {
      return initialState;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions; // Trả ra tất cả các Action được khai báo trong reducer
export default dialogSlice.reducer;
