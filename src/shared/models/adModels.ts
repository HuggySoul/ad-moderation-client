import type { AdStatus, ModerationAction, ModerationDecisionReason } from "../types";

export const STATUS_LABELS: Record<AdStatus, string> = {
  pending: "на модерации",
  approved: "одобрено",
  rejected: "отклонено",
  draft: "на доработке",
};

export const getStatusLabelStyleByValue = (status: AdStatus) => {
  switch (status) {
    case "approved":
      return { color: "success", text: "одобрено" };
    case "rejected":
      return { color: "error", text: "отклонено" };
    case "pending":
      return { color: "warning", text: "на модерации" };
    case "draft":
      return { color: "default", text: "на доработке" };
    default: {
      const _: never = status;
      return _;
    }
  }
};

export const getActionLabel = (action: ModerationAction): string => {
  switch (action) {
    case "approved":
      return "Одобрено";
    case "rejected":
      return "Отклонено";
    case "requestChanges":
      return "Запрошены изменения";
    default:
      return action;
  }
};

export const MODERATION_REASONS: { label: string; value: ModerationDecisionReason }[] = [
  { label: "Запрещенный товар", value: "Запрещенный товар" },
  { label: "Неверная категория", value: "Неверная категория" },
  { label: "Некорректное описание", value: "Некорректное описание" },
  { label: "Проблемы с фото", value: "Проблемы с фото" },
  { label: "Подозрение на мошенничество", value: "Подозрение на мошенничество" },
  { label: "Другое", value: "Другое" },
];
