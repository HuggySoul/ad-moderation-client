import { baseApi } from "@/shared/api/baseApi";
import type { AdvertisementDto } from "@/shared/types";

export const adItemApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdItem: build.query<AdvertisementDto, { id: number }>({
      query: ({ id }) => `/ads/${id}`,
      providesTags: (_result, _error, { id }) => [{ type: "AdItem", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAdItemQuery } = adItemApi;
