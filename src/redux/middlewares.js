import { logOut } from "./slices/authSlice";
import { persistor } from "./store";

export const logOutMiddleware = () => {
  return (next) => {
    return (action) => {
      if (action.type === logOut.type) {
        // Xoá/Loại bỏ đi toàn bộ dữ liệu đã lưu trong peristor
        persistor.purge();
      }
      return next(action);
    };
  };
};
