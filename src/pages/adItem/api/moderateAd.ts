import { baseApi } from "@/shared/api/baseApi";
import type { ModerationDecisionReason } from "@/shared/types";

interface RejectBody {
  reason: ModerationDecisionReason;
  comment: string;
}

interface RequestChangesBody {
  reason: ModerationDecisionReason;
  comment: string;
}

export const moderationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /** Одобрить */
    approveAd: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/ads/${id}/approve`,
        method: "POST",
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "AdItem", id }],
    }),

    /** Отклонить */
    rejectAd: build.mutation<void, { id: number; body: RejectBody }>({
      query: ({ id, body }) => ({
        url: `/ads/${id}/reject`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "AdItem", id }],
    }),

    /** Запросить изменения */
    requestChangesAd: build.mutation<void, { id: number; body: RequestChangesBody }>({
      query: ({ id, body }) => ({
        url: `/ads/${id}/request-changes`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "AdItem", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useApproveAdMutation, useRejectAdMutation, useRequestChangesAdMutation } =
  moderationApi;
