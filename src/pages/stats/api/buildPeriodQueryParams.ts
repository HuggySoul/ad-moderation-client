import type { GetStatsSummaryParams, StatsPeriod } from "@/shared/types";

type CustomRange = [string, string] | null;

export function buildPeriodQueryParams(
  period: StatsPeriod,
  customRange: CustomRange
): GetStatsSummaryParams | void {
  if (period !== "custom") {
    return { period };
  }

  if (!customRange) {
    return undefined;
  }

  const [start, end] = customRange;

  if (!start || !end) {
    return undefined;
  }

  return {
    period: "custom",
    startDate: start,
    endDate: end,
  };
}
