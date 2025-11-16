import { memo, useMemo } from "react";
import { Column } from "@ant-design/plots";
import type { ColumnConfig } from "@ant-design/plots";
import cls from "./categoriesChart.module.css";
import { useGetCategoriesChartQuery } from "../../api/getStats";
import type {
  CategoriesChartDto,
  CategoryStatsPoint,
  StatsPeriodFilter,
} from "@/shared/types";
import { useTheme } from "@/features/changeAppTheme";
import { getChartPalette } from "../../lib";
import { Skeleton } from "antd";
import { BarChartOutlined } from "@ant-design/icons";

interface CategoriesChartProps {
  filter: StatsPeriodFilter | void;
}

const MAX_COLUMN_WIDTH = 45;

function mapCategoriesToColumnData(data?: CategoriesChartDto): CategoryStatsPoint[] {
  if (!data) {
    return [];
  }

  return Object.entries(data).map(([categoryName, count]) => ({
    categoryName,
    count,
  }));
}

export const CategoriesChart = memo(function CategoriesChart(
  props: CategoriesChartProps
) {
  const { filter } = props;

  const { mode } = useTheme();
  const palette = getChartPalette(mode);

  const { data, isLoading } = useGetCategoriesChartQuery(filter);

  const chartData = useMemo(() => mapCategoriesToColumnData(data), [data]);

  const config: ColumnConfig = {
    data: chartData,
    xField: "categoryName",
    yField: "count",

    style: {
      radiusTopLeft: 4,
      radiusTopRight: 4,
      maxWidth: MAX_COLUMN_WIDTH,
      fill: palette.success,
    },

    legend: false,

    tooltip: {
      shared: false,
    },

    axis: {
      x: {
        label: true,
        labelFill: palette.axisText,
      },
      y: {
        label: true,
        labelFill: palette.axisText,
        title: "Количество объявлений",
        titleFill: palette.axisText,
      },
    },
  };

  if (isLoading && chartData.length === 0) {
    return (
      <div className={cls.chartContainer}>
        <div className={cls.chartTitle}>График по категориям</div>
        <Skeleton.Node active>
          <BarChartOutlined />
        </Skeleton.Node>
      </div>
    );
  }

  if (!isLoading && chartData.length === 0) {
    return (
      <div className={cls.chartContainer}>
        <div className={cls.chartTitle}>График по категориям</div>
        <div className={cls.chartPlaceholder}>Нет данных за выбранный период</div>
      </div>
    );
  }

  return (
    <div className={cls.chartContainer}>
      <div className={cls.chartTitle}>График по категориям</div>
      <div className={cls.chartBody}>
        <Column {...config} />
      </div>
    </div>
  );
});
