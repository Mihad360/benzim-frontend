import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../axios/axiosBaseQuery";
import { envConfig } from "../../../config/envConfig";

export const baseApi = createApi({
  reducerPath: "api",
  tagTypes: ["auth", "admin", "user", "cook", "earning"],
  baseQuery: axiosBaseQuery({
    baseUrl: envConfig.baseApi as string,
  }),
  endpoints: () => ({}),
});
