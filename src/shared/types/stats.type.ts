/*
 * =======================================
 * DTO для статистики (с бэка)
 * =======================================
 */

/** Общая статистика по модерации за выбранный период и его подмножества */
export interface StatsSummaryDto {
  /** Всего объявлений, проверенных модератором за весь выбранный период */
  totalReviewed: number;

  /** Всего проверено за сегодня (вне зависимости от выбранного period) */
  totalReviewedToday: number;

  /** Всего проверено за текущую неделю */
  totalReviewedThisWeek: number;

  /** Всего проверено за текущий месяц */
  totalReviewedThisMonth: number;

  /** Процент одобренных объявлений (0–100) */
  approvedPercentage: number;

  /** Процент отклонённых объявлений (0–100) */
  rejectedPercentage: number;

  /** Процент объявлений, отправленных на доработку (0–100) */
  requestChangesPercentage: number;

  /**
   * Среднее время модерации одного объявления.
   * Swagger: integer — можно трактовать как секунды либо миллисекунды (по ТЗ/реализации бэка).
   */
  averageReviewTime: number;
}

/** Query-параметры для /stats/summary */
export type GetStatsSummaryParams = StatsPeriodFilter;

/** Точка данных для графика активности по дням */
export interface ActivityPointDto {
  /** Дата, за которую посчитана активность (YYYY-MM-DD) */
  date: IsoDateString;

  /** Количество одобренных объявлений за день */
  approved: number;

  /** Количество отклонённых объявлений за день */
  rejected: number;

  /** Количество объявлений, отправленных на доработку за день */
  requestChanges: number;
}

/** Ответ /stats/chart/activity — массив точек по дням */
export type ActivityChartDto = ActivityPointDto[];

/** Query-параметры для /stats/chart/activity */
export type GetActivityChartParams = StatsPeriodFilter;

/**
 * Удобный обобщённый тип для транслирования активностей в Record,
 * если понадобится агрегировать по типу решения.
 */
export type ActivityPointByDecision = Record<StatsDecisionKey, number>;

/** DTO распределения решений модератора (pie chart) */
export interface DecisionsDistributionDto {
  /** Доля одобренных объявлений за период (0–100 или 0–1 — см. реализацию бэка) */
  approved: number;

  /** Доля отклонённых объявлений за период */
  rejected: number;

  /** Доля объявлений, отправленных на доработку за период */
  requestChanges: number;
}

/** Query-параметры для /stats/chart/decisions */
export type GetDecisionsChartParams = StatsPeriodFilter;

/**
 * Обобщённый тип "ключ решения → значение".
 * Удобен для обхода в UI (map по enum-ключам) и для типизации хелперов.
 */
export type DecisionsDistributionMap = Record<StatsDecisionKey, number>;

/**
 * DTO ответа /stats/chart/categories.
 * Ключом выступает наименование категории (или другой идентификатор, который вернёт бекенд),
 * значением — количество проверенных объявлений в категории за период.
 *
 * Пример:
 * {
 *   "Недвижимость": 42,
 *   "Авто": 15,
 *   "Услуги": 8
 * }
 */
export type CategoriesChartDto = Record<string, number>;

/** Query-параметры для /stats/chart/categories */
export type GetCategoriesChartParams = StatsPeriodFilter;

/**
 * Удобный нормализованный тип для фронта под график:
 * можно получить из CategoriesChartDto, пробежавшись по Object.entries.
 */
export interface CategoryStatsPoint {
  /** Отображаемое название категории */
  categoryName: string;
  /** Количество объявлений в этой категории */
  count: number;
}

/** Текущий модератор (DTO для /moderators/me) */
export interface ModeratorDto {
  id: number;
  name: string;
  email: string;
  /** Роль модератора, как отдаёт бэкенд (например, "moderator", "admin") */
  role: string;
  /** Вложенная статистика модератора */
  statistics: ModeratorStatsDto;
  /** Список строковых прав/разрешений модератора */
  permissions: string[];
}

/** Статистика конкретного модератора (из /moderators/me) */
export interface ModeratorStatsDto {
  /** Всего проверено объявлений за всё время */
  totalReviewed: number;

  /** Проверено объявлений сегодня */
  todayReviewed: number;

  /** Проверено объявлений за текущую неделю */
  thisWeekReviewed: number;

  /** Проверено объявлений за текущий месяц */
  thisMonthReviewed: number;

  /** Среднее время модерации одного объявления */
  averageReviewTime: number;

  /** Доля одобрений (0–100 или 0–1, в зависимости от реализации бэка) */
  approvalRate: number;
}

/**
 * Общий фильтр по периоду для всех /stats/* запросов.
 * Используется как базовый тип для query-параметров.
 */
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

export type IsoDateString = string;

export const STATS_PERIODS = ["today", "week", "month", "custom"] as const;
export type StatsPeriod = (typeof STATS_PERIODS)[number];

export const STATS_DECISION_KEYS = ["approved", "rejected", "requestChanges"] as const;
export type StatsDecisionKey = (typeof STATS_DECISION_KEYS)[number];
