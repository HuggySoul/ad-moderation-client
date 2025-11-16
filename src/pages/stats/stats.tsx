import { useState } from "react";
import { Card, Radio, DatePicker, Divider } from "antd";
import type { RadioChangeEvent } from "antd";
import cls from "./stats.module.css";
import { useGetStatsSummaryQuery } from "./api/getStats";
import { formatNumber, formatReviewTime, formatPercent } from "@/shared/lib";
import type { StatsPeriod, GetStatsSummaryParams } from "@/shared/types";
import { STATS_PERIOD_OPTIONS } from "@/shared/models";
import { buildPeriodQueryParams } from "./api/buildPeriodQueryParams";
import { ActivityChart } from "./ui/activityChart/activityChart";
import { DecisionsChart } from "./ui/decisionsChart/decisionsChart";
import { CategoriesChart } from "./ui/categoriesChart/categoriesChart";

const { RangePicker } = DatePicker;

type CustomRange = [string, string] | null;

export function Stats() {
  const [period, setPeriod] = useState<StatsPeriod>("today");
  const [customRange, setCustomRange] = useState<CustomRange>(null);

  const queryArg: GetStatsSummaryParams | void = buildPeriodQueryParams(
    period,
    customRange
  );

  const { data: summary, isLoading } = useGetStatsSummaryQuery(queryArg);

  const handlePeriodChange = (event: RadioChangeEvent) => {
    setPeriod(event.target.value as StatsPeriod);
  };

  const handleRangeChange: React.ComponentProps<typeof RangePicker>["onChange"] = (
    _,
    dateStrings
  ) => {
    const [start, end] = dateStrings;

    if (!start || !end) {
      setCustomRange(null);
      return;
    }

    setCustomRange([start, end]);
  };

  return (
    <div className={cls.stats}>
      <div className={cls.filterBar}>
        <Radio.Group
          className={cls.periodGroup}
          options={STATS_PERIOD_OPTIONS}
          optionType="button"
          buttonStyle="solid"
          value={period}
          onChange={handlePeriodChange}
        />

        {period === "custom" && (
          <RangePicker
            className={cls.rangePicker}
            onChange={handleRangeChange}
            allowClear
            format="YYYY-MM-DD"
          />
        )}
      </div>

      <div className={cls.cardsGrid}>
        <Card className={cls.card}>
          <div className={cls.cardInner}>
            <div className={cls.metricLabel}>Всего проверено объявлений</div>
            <div className={cls.metricValue}>{formatNumber(summary?.totalReviewed)}</div>
          </div>
        </Card>

        <Card className={`${cls.card} ${cls.warning}`}>
          <div className={cls.cardInner}>
            <div className={cls.metricLabel}>
              Среднее время на проверку одного объявления
            </div>
            <div className={cls.metricValue}>
              {isLoading ? "—" : formatReviewTime(summary?.averageReviewTime)}
            </div>
          </div>
        </Card>

        <Card className={`${cls.card} ${cls.approve}`}>
          <div className={cls.cardInner}>
            <div className={cls.metricLabel}>Процент одобренных</div>
            <div className={cls.metricValue}>
              {formatPercent(summary?.approvedPercentage)}
            </div>
          </div>
        </Card>

        <Card className={`${cls.card} ${cls.reject}`}>
          <div className={cls.cardInner}>
            <div className={cls.metricLabel}>Процент отклоненных</div>
            <div className={cls.metricValue}>
              {formatPercent(summary?.rejectedPercentage)}
            </div>
          </div>
        </Card>
      </div>

      <Divider />

      <ActivityChart filter={queryArg} />

      <Divider />

      <DecisionsChart filter={queryArg} />

      <Divider />

      <CategoriesChart filter={queryArg} />
    </div>
  );
}
