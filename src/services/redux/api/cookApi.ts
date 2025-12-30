import { baseApi } from "./baseApi";

const cooksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    cookApprovals: build.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args && typeof args === "object") {
          Object.entries(args).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              params.append(key, String(value));
            }
          });
        }

        return {
          url: "/cook-verify/cook-approvals",
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
      providesTags: ["cook"],
    }),
    approveCook: build.mutation({
      query: (id) => ({
        url: `/cook-verify/approve-cook/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["cook"],
    }),
  }),
});

export const { useCookApprovalsQuery, useApproveCookMutation } = cooksApi;
