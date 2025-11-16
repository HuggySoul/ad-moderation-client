import type { StatsDecisionKey, StatsPeriod } from "../types";

export const STATS_PERIOD_OPTIONS: { label: string; value: StatsPeriod }[] = [
  { label: "Сегодня", value: "today" },
  { label: "Эта неделя", value: "week" },
  { label: "Этот месяц", value: "month" },
  { label: "Произвольно", value: "custom" },
];

export const STATS_DECISION_OPTIONS: {
  label: string;
  value: StatsDecisionKey;
}[] = [
  { label: "Одобрено", value: "approved" },
  { label: "Отклонено", value: "rejected" },
  { label: "На доработку", value: "requestChanges" },
];
