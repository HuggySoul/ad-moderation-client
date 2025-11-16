import { baseApi } from "@/shared/api/baseApi";
import type {
  StatsSummaryDto,
  GetStatsSummaryParams,
  ActivityChartDto,
  GetActivityChartParams,
  DecisionsDistributionDto,
  GetDecisionsChartParams,
  CategoriesChartDto,
  GetCategoriesChartParams,
  ModeratorDto,
  StatsPeriodFilter,
} from "@/shared/types";

/** Хелпер для сборки query-строки для всех /stats/* ручек */
function buildStatsQueryUrl(basePath: string, params?: StatsPeriodFilter | void): string {
  if (!params) {
    return basePath;
  }

  const searchParams = new URLSearchParams();

  if (params.period) {
    searchParams.set("period", params.period);
  }

  if (params.startDate) {
    searchParams.set("startDate", params.startDate);
  }

  if (params.endDate) {
    searchParams.set("endDate", params.endDate);
  }

  const queryString = searchParams.toString();

  return queryString ? `${basePath}?${queryString}` : basePath;
}

export const statsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /** Общая статистика модератора (карточки с метриками) */
    getStatsSummary: build.query<StatsSummaryDto, GetStatsSummaryParams | void>({
      query: (params) => {
        const url = buildStatsQueryUrl("/stats/summary", params);

        return {
          url,
          method: "GET",
        };
      },
    }),

    /** График активности по дням (столбчатая диаграмма) */
    getActivityChart: build.query<ActivityChartDto, GetActivityChartParams | void>({
      query: (params) => {
        const url = buildStatsQueryUrl("/stats/chart/activity", params);

        return {
          url,
          method: "GET",
        };
      },
    }),
    /** Круговая диаграмма распределения решений (одобрено/отклонено/на доработку) */
    getDecisionsChart: build.query<
      DecisionsDistributionDto,
      GetDecisionsChartParams | void
    >({
      query: (params) => {
        const url = buildStatsQueryUrl("/stats/chart/decisions", params);

        return {
          url,
          method: "GET",
        };
      },
    }),

    /** График по категориям проверенных объявлений */
    getCategoriesChart: build.query<CategoriesChartDto, GetCategoriesChartParams | void>({
      query: (params) => {
        const url = buildStatsQueryUrl("/stats/chart/categories", params);

        return {
          url,
          method: "GET",
        };
      },
    }),

    /** Информация о текущем модераторе + его статистика */
    getModeratorMe: build.query<ModeratorDto, void>({
      query: () => ({
        url: "/moderators/me",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetStatsSummaryQuery,
  useGetActivityChartQuery,
  useGetDecisionsChartQuery,
  useGetCategoriesChartQuery,
  useGetModeratorMeQuery,
} = statsApi;
