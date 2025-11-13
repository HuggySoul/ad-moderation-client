/*
 * =======================================
 * Объявление в виде DTO (корневые типы с бэка)
 * =======================================
 */

/** Объявление */
export interface AdvertisementDto {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  status: AdStatus;
  priority: AdPriority;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
  /** Список URL’ов изображений */
  images: string[];
  seller: SellerDto;
  /** Таблица характеристик (ключ-значение) */
  characteristics: Record<string, string>;
  moderationHistory: ModerationHistoryDto[];
}

/** Алиас для дат, чтобы не путать с произвольными строками */
type IsoDateTimeString = string; // ISO 8601 date-time

/** Статус объявления */
export type AdStatus = "pending" | "approved" | "rejected" | "draft";

/** Приоритет объявления */
export type AdPriority = "normal" | "urgent";

/** Продавец объявления */
export interface SellerDto {
  id: number;
  name: string;
  rating: string;
  totalAds: number;
  /** Дата регистрации в ISO формате date-time */
  registeredAt: IsoDateTimeString;
}

/** Запись в истории модерации объявления */
export interface ModerationHistoryDto {
  id: number;
  moderatorId: number;
  moderatorName: string;
  action: ModerationAction;
  /** Причина может отсутствовать */
  reason: string | null;
  comment: string;
  /** Когда действие было совершено */
  timestamp: IsoDateTimeString;
}

/** Действие модератора в истории */
export type ModerationAction = "approved" | "rejected" | "requestChanges";

/** Период статистики */
export type StatsPeriod = "today" | "week" | "month" | "custom";

/** Поля сортировки списка объявлений */
export type AdsSortBy = "createdAt" | "price" | "priority";

/** Порядок сортировки */
export type SortOrder = "asc" | "desc";
