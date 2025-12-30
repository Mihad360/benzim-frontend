import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query({
      query: () => ({
        url: "/cook-verify/cook-approvals",
        method: "GET",
      }),
      providesTags: ["cook"],
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
