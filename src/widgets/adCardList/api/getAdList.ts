import { baseApi } from "@/shared/api/baseApi";
import type { AdvertisementDto } from "@/shared/types";
import type { AdsListQueryParams } from "./getCardsQueryParams.type";

export const adsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdsList: build.query<
      {
        ads: AdvertisementDto[];
        pagination: {
          currentPage: number;
          totalPages: number;
          totalItems: number;
          itemsPerPage: number;
        };
      },
      AdsListQueryParams | void
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();

        if (params?.page != null) {
          searchParams.set("page", String(params.page));
        }

        if (params?.limit != null) {
          searchParams.set("limit", String(params.limit));
        }

        if (params?.status && params.status.length > 0) {
          params.status.forEach((status) => {
            searchParams.append("status", status);
          });
        }

        if (params?.categoryId != null) {
          searchParams.set("categoryId", String(params.categoryId));
        }

        if (params?.minPrice != null) {
          searchParams.set("minPrice", String(params.minPrice));
        }

        if (params?.maxPrice != null) {
          searchParams.set("maxPrice", String(params.maxPrice));
        }

        if (params?.search) {
          searchParams.set("search", params.search);
        }

        if (params?.sortBy) {
          searchParams.set("sortBy", params.sortBy);
        }

        if (params?.sortOrder) {
          searchParams.set("sortOrder", params.sortOrder);
        }

        const queryString = searchParams.toString();
        const url = queryString ? `/ads?${queryString}` : "/ads";

        return {
          url,
          method: "GET",
        };
      },
      /** теги для упрощения работы с кэшем при мутациях*/
      providesTags: (result) =>
        result?.ads
          ? [
              ...result.ads.map((ad) => ({
                type: "Ads" as const,
                id: ad.id,
              })),
              { type: "Ads" as const, id: "LIST" },
            ]
          : [{ type: "Ads" as const, id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAdsListQuery } = adsApi;
