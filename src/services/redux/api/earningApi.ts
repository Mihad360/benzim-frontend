import { baseApi } from "./baseApi";

const earningApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    adminEarnings: build.query({
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
          url: "/earnings/",
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
      providesTags: ["earning"],
    }),
    dashboardStats: build.query({
      query: (year?: number) => ({
        url: "/earnings/dashboard-stats",
        method: "GET",
        params: year ? { year } : undefined,
      }),

      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),

      providesTags: ["earning"],
    }),
  }),
});

export const { useAdminEarningsQuery, useDashboardStatsQuery } = earningApi;
