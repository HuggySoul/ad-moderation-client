import type { AdvertisementDto } from "@/shared/types";

/** Карточка объявления */
export type AdvertisementViewCard = Pick<
  AdvertisementDto,
  "id" | "title" | "price" | "category" | "createdAt" | "status" | "priority" | "images"
>;
