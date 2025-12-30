import { baseApi } from "./baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allUsers: build.query({
      query: (args) => {
        const params = new URLSearchParams();

        // ✅ Handle object with role and searchTerm
        if (args) {
          if (args.role) {
            params.append("role", args.role);
          }
          if (args.searchTerm) {
            params.append("searchTerm", args.searchTerm);
          }
        }

        return {
          url: "/users/",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["user"],
    }),
    getMe: build.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    editProfile: build.mutation({
      query: (data) => ({
        url: "/users/edit-profile",
        method: "PATCH",
        contentType: "application/json",
        data: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useAllUsersQuery, useEditProfileMutation, useGetMeQuery } =
  usersApi;
