import { baseApi } from "./baseApi";

const cooksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    cookApprovals: build.query({
      query: () => ({
        url: "/cook-verify/cook-approvals",
        method: "GET",
      }),
      providesTags: ["cook"],
    }),
  }),
});

export const { useCookApprovalsQuery } = cooksApi;
