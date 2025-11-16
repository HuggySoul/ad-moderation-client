import type { ActiveFilters, FiltersAction } from "../types/filter.type";

const initialFiltersState: ActiveFilters = {};

/** Редьюсер для управления активными фильтрами */
export function filtersReducer(
  state: ActiveFilters,
  action: FiltersAction
): ActiveFilters {
  switch (action.type) {
    case "SET_STATUS":
      return {
        ...state,
        status: action.payload.length > 0 ? action.payload : undefined,
      };

    case "SET_CATEGORY":
      return {
        ...state,
        categoryID: action.payload ?? undefined,
      };

    case "SET_PRICE_RANGE":
      return {
        ...state,
        minPrice: action.payload.minPrice,
        maxPrice: action.payload.maxPrice,
      };

    case "RESET_FILTERS":
      return initialFiltersState;

    default:
      return state;
  }
}
