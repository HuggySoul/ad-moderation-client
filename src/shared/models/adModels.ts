import type { AdStatus } from "../types";

export const STATUS_LABELS: Record<AdStatus, string> = {
  pending: "на модерации",
  approved: "одобрено",
  rejected: "отклонено",
  draft: "на доработке",
};
