// import { logOut } from "@redux/slices/authSlice";
// import { persistor } from "@redux/store";
import { login, logOut } from "@redux/slices/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    console.log({ store: getState() });
    const token = getState().auth.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result?.error?.status === 401 &&
    result?.error?.data?.message === "Token has expired."
  ) {
    // Refresh token logic
    const refreshToken = api.getState().auth.refreshToken;

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions,
      );

      const newAccessToken = refreshResult?.data?.accessToken;

      if (newAccessToken) {
        api.dispatch(
          login({
            accessToken: newAccessToken,
            refreshToken,
          }),
        );
        
        result = await baseQuery(args, api, extraOptions);
      }else{
        api.dispatch(logOut());
        window.location.href = "/login"; 
      }

      console.log({ refreshResult });
    }

    /// api.dispatch(logOut());
    // await persistor.purge(); // Xoá/Loại bỏ đi toàn bộ dữ liệu đã lưu trong peristor
    /// window.location.href = "/login"; // Chuyển hướng về trang Login

    console.log({ result });

    // alert("TOKEN EXPIRED!");

  }
  return result;
};

export const rootApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => {
    return {
      register: builder.mutation({
        query: ({ fullName, email, password }) => {
          return {
            url: "/signup",
            body: { fullName, email, password },
            method: "POST",
          };
        },
      }),

      login: builder.mutation({
        query: ({ email, password }) => {
          return {
            url: "/login",
            body: { email, password },
            method: "POST",
          };
        },
      }),

      verifyOTP: builder.mutation({
        query: ({ email, otp }) => {
          return {
            url: "/verify-otp",
            body: { email, otp },
            method: "POST",
          };
        },
      }),

      refreshToken: builder.mutation({
        query: (refreshToken) => {
          return {
            url: "/refresh-token",
            body: { refreshToken },
            method: "POST",
          };
        },
      }),

      getAuthUser: builder.query({
        query: () => "/auth-user",
      }),

      createPost: builder.mutation({
        query: (formData) => {
          return {
            url: "/posts",
            body: formData,
            method: "POST",
          };
        },
        invalidatesTags: ['POSTS']
      }),

      getPosts: builder.query({
        query: () => "/posts",
        providesTags: ['POSTS'],
      }),

    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOTPMutation,
  useGetAuthUserQuery,
  useCreatePostMutation,
  useRefreshTokenMutation,
  useGetPostsQuery,
} = rootApi;
