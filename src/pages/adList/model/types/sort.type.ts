/** Поля сортировки списка объявлений */
export type AdsSortBy = "createdAt" | "price" | "priority";

/** Порядок сортировки */
export type SortOrder = "asc" | "desc";

export interface SortConfig {
  order?: SortOrder;
  orderBy?: AdsSortBy;
}
