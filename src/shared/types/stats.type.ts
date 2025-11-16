/** Общая статистика по модерации за выбранный период */
export interface StatsSummaryDto {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
}

/** Query-параметры для /stats/summary */
export type GetStatsSummaryParams = StatsPeriodFilter;

/** Точка данных для графика активности по дням */
export interface ActivityPointDto {
  date: IsoDateString;
  approved: number;
  rejected: number;
  requestChanges: number;
}

export type ActivityChartDto = ActivityPointDto[];

export type GetActivityChartParams = StatsPeriodFilter;

/** DTO распределения решений модератора (pie chart) */
export interface DecisionsDistributionDto {
  approved: number;
  rejected: number;
  requestChanges: number;
}

export type GetDecisionsChartParams = StatsPeriodFilter;

export type DecisionsDistributionMap = Record<StatsDecisionKey, number>;

export type CategoriesChartDto = Record<string, number>;

/** Query-параметры для /stats/chart/categories */
export type GetCategoriesChartParams = StatsPeriodFilter;

/** Удобный нормализованный тип под график */
export interface CategoryStatsPoint {
  categoryName: string;
  count: number;
}

/** Текущий модератор */
export interface ModeratorDto {
  id: number;
  name: string;
  email: string;
  role: string;
  statistics: ModeratorStatsDto;
  permissions: string[];
}

/** Статистика конкретного модератора*/
export interface ModeratorStatsDto {
  totalReviewed: number;
  todayReviewed: number;
  thisWeekReviewed: number;
  thisMonthReviewed: number;
  averageReviewTime: number;
  approvalRate: number;
}

/** Общий фильтр по периоду для всех /stats/* запросов */
export interface StatsPeriodFilter {
  /** today | week | month | custom */
  period?: StatsPeriod;
  /**
   * Начальная дата произвольного периода (YYYY-MM-DD).
   * Используется, когда period === "custom".
   */
  startDate?: IsoDateString;
  /**
   * Конечная дата произвольного периода (YYYY-MM-DD).
   * Используется, когда period === "custom".
   */
  endDate?: IsoDateString;
}

type IsoDateString = string;

export const STATS_PERIODS = ["today", "week", "month", "custom"] as const;
export type StatsPeriod = (typeof STATS_PERIODS)[number];

export const STATS_DECISION_KEYS = ["approved", "rejected", "requestChanges"] as const;
export type StatsDecisionKey = (typeof STATS_DECISION_KEYS)[number];
