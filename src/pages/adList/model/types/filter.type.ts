import type { AdStatus } from "@/shared/types";

export interface ActiveFilters {
  status?: AdStatus[];
  categoryID?: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface Categories {
  id: number;
  name: string;
}

/** Значения формы фильтров */
export interface FiltersFormValues {
  status?: AdStatus[];
  price?: [number, number] | null;
  categoryId?: number | null;
}

/** Экшены для useReducer */
export type FiltersAction =
  | { type: "SET_STATUS"; payload: AdStatus[] }
  | { type: "SET_CATEGORY"; payload?: number }
  | { type: "SET_PRICE_RANGE"; payload: { minPrice?: number; maxPrice?: number } }
  | { type: "RESET_FILTERS" };
