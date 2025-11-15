import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1",
  }),
  tagTypes: ["Ads", "AdItem"],
  endpoints: () => ({}),
});
