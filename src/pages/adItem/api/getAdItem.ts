import { baseApi } from "@/shared/api/baseApi";
import type { AdvertisementDto } from "@/shared/types";

export const adItemApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdItem: build.query<{ adItem: AdvertisementDto }, { id: number }>({
      query: (params) => ({
        url: `/ads/${params.id}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAdItemQuery } = adItemApi;
