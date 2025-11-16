import { memo, useMemo } from "react";
import { Column } from "@ant-design/plots";
import type { ColumnConfig } from "@ant-design/plots";
import cls from "./activityChart.module.css";
import { useGetActivityChartQuery } from "../../api/getStats";
import type { ActivityChartDto, StatsPeriodFilter } from "@/shared/types";
import { getChartPalette } from "../../lib";
import { Skeleton } from "antd";
import { useTheme } from "@/features/changeAppTheme";
import { BarChartOutlined } from "@ant-design/icons";

interface ActivityChartProps {
  filter: StatsPeriodFilter | void;
}

type SeriesName = "Одобрено" | "Отклонено" | "На доработку";

interface ColumnDataItem {
  date: string;
  value: number;
  type: SeriesName;
}

function mapActivityToColumnData(data?: ActivityChartDto): ColumnDataItem[] {
  if (
    !data ||
    data.filter(
      (point) =>
        point.approved === 0 && point.rejected === 0 && point.requestChanges === 0
    ).length === data.length
  ) {
    return [];
  }

  return data.flatMap((point) => [
    {
      date: point.date,
      value: point.approved,
      type: "Одобрено",
    },
    {
      date: point.date,
      value: point.rejected,
      type: "Отклонено",
    },
    {
      date: point.date,
      value: point.requestChanges,
      type: "На доработку",
    },
  ]);
}

const MAX_COLUMN_WIDTH = 45;

/** Столбчатая диаграмма активности модератора */
export const ActivityChart = memo(function ActivityChart(props: ActivityChartProps) {
  const { filter } = props;

  const { mode } = useTheme();
  const palette = getChartPalette(mode);

  const { data, isLoading } = useGetActivityChartQuery(filter);

  const chartData = useMemo(() => mapActivityToColumnData(data), [data]);
  const config: ColumnConfig = {
    data: chartData,
    xField: "date",
    yField: "value",
    colorField: "type",
    isStack: true,

    style: {
      radiusTopLeft: 4,
      radiusTopRight: 4,
      maxWidth: MAX_COLUMN_WIDTH,
    },

    legend: {
      color: {
        position: "top",
        itemLabelFill: palette.axisText,
      },
    },

    tooltip: {
      shared: true,
    },

    scale: {
      color: {
        range: [palette.success, palette.error, palette.warning],
      },
    },

    axis: {
      x: {
        label: true,
        labelFill: palette.axisText,
      },
      y: {
        label: true,
        labelFill: palette.axisText,
      },
    },
  };

  if (isLoading && chartData.length === 0) {
    return (
      <div className={cls.chartContainer}>
        <div className={cls.chartTitle}>Активность по дням</div>
        <Skeleton.Node active>
          <BarChartOutlined />
        </Skeleton.Node>
      </div>
    );
  }

  if (!isLoading && chartData.length === 0) {
    return (
      <div className={cls.chartContainer}>
        <div className={cls.chartTitle}>Активность по дням</div>
        <div className={cls.chartPlaceholder}>Нет данных за выбранный период</div>
      </div>
    );
  }

  return (
    <div className={cls.chartContainer}>
      <div className={cls.chartTitle}>Активность по дням</div>
      <div className={cls.chartBody}>
        <Column {...config} />
      </div>
    </div>
  );
});
