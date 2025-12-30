import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["auth"],
    }),
    signUpUser: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["auth"],
    }),
    forgetPassord: build.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["auth"],
    }),
    verifyOtp: build.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["auth"],
    }),
    resetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["auth"],
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignUpUserMutation,
  useForgetPassordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
