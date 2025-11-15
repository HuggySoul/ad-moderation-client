import type { AdStatus, SortOrder, AdsSortBy } from "@/shared/types";

/** Query-параметры для получения списка объявлений */
export interface AdsListQueryParams {
  /** Номер страницы (>= 1, по умолчанию 1) */
  page?: number;
  /** Кол-во элементов на странице (1..100, по умолчанию 10) */
  limit?: number;
  /** Множественный фильтр по статусу */
  status?: AdStatus[];
  /** Фильтр по ID категории */
  categoryId?: number;
  /** Минимальная цена */
  minPrice?: number;
  /** Максимальная цена */
  maxPrice?: number;
  /** Поиск по названию/описанию */
  search?: string;
  /** Поле сортировки */
  sortBy?: AdsSortBy;
  /** Порядок сортировки */
  sortOrder?: SortOrder;
}
