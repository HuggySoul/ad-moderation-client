import { baseApi } from "@/shared/api/baseApi";
import type { Categories } from "../model/types/filter.type";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<{ categories: Categories[] }, void>({
      query: () => ({
        url: "/ads/categories",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetCategoriesQuery } = categoriesApi;
