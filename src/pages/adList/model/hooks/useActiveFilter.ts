import { useReducer } from "react";
import type { ActiveFilters } from "../types/filter.type";
import type { AdStatus } from "@/shared/types";
import { filtersReducer } from "./filterReducer";
import { useCallback } from "react";

const initialFiltersState: ActiveFilters = {};

/** Позволяет удобно управлять активными фильтрами */
export function useActiveFilters(initialState: ActiveFilters = initialFiltersState) {
  const [filters, dispatch] = useReducer(filtersReducer, initialState);

  const setStatus = useCallback(
    (status: AdStatus[]) => {
      dispatch({ type: "SET_STATUS", payload: status });
    },
    [dispatch]
  );

  const setCategoryID = useCallback(
    (categoryID?: number) => {
      dispatch({ type: "SET_CATEGORY", payload: categoryID });
    },
    [dispatch]
  );

  const setPriceRange = useCallback(
    (minPrice?: number, maxPrice?: number) =>
      dispatch({
        type: "SET_PRICE_RANGE",
        payload: { minPrice, maxPrice },
      }),
    [dispatch]
  );

  const resetFilters = useCallback(() => dispatch({ type: "RESET_FILTERS" }), [dispatch]);

  return {
    filters,
    setStatus,
    setCategoryID,
    setPriceRange,
    resetFilters,
  };
}
