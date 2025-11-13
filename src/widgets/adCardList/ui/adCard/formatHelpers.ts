import type { AdStatus } from "@/shared/types";

export const getStatus = (status: AdStatus) => {
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

export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
    return {
      day: "00",
      month: "00",
      year: "00",
    };
  }

  return {
    day: `${day}`,
    month: `${month}`.padStart(2, "0"),
    year: `${year}`.slice(2),
    hour: `${hour}`,
    minute: `${minute}`,
  };
};
