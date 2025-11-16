import { memo, useMemo } from "react";
import { Pie } from "@ant-design/plots";
import type { PieConfig } from "@ant-design/plots";
import cls from "./decisionsChart.module.css";
import { useGetDecisionsChartQuery } from "../../api/getStats";
import type { DecisionsDistributionDto, StatsPeriodFilter } from "@/shared/types";
import { useTheme } from "@/features/changeAppTheme";
import { getChartPalette } from "../../lib";
import { PieChartOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";

interface DecisionsChartProps {
  filter: StatsPeriodFilter | void;
}

type SliceName = "Одобрено" | "Отклонено" | "На доработку";

interface PieDataItem {
  type: SliceName;
  value: number;
}

function mapDecisionsToPieData(data?: DecisionsDistributionDto): PieDataItem[] {
  if (!data) {
    return [];
  }

  const round2 = (value: number) => Number(value.toFixed(2));

  const items: PieDataItem[] = [
    { type: "Одобрено", value: round2(data.approved) },
    { type: "Отклонено", value: round2(data.rejected) },
    { type: "На доработку", value: round2(data.requestChanges) },
  ];

  return items.filter((item) => item.value > 0);
}

/** Круговая диаграмма принятия решений */
export const DecisionsChart = memo(function DecisionsChart(props: DecisionsChartProps) {
  const { filter } = props;

  const { mode } = useTheme();
  const palette = getChartPalette(mode);

  const { data, isLoading } = useGetDecisionsChartQuery(filter);

  const pieData = useMemo(() => mapDecisionsToPieData(data), [data]);

  const config: PieConfig = {
    data: pieData,
    angleField: "value",
    colorField: "type",

    // делаем пончик заметно крупнее
    radius: 0.95,
    innerRadius: 0.55,
    height: 320,
    padding: 0,

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

    label: {
      text: "value",
      style: {
        fill: palette.axisText,
        fontSize: 12,
      },
    },
  };

  if (isLoading && pieData.length === 0) {
    return (
      <div className={cls.chartContainer}>
        <div className={cls.chartTitle}>Распределение решений</div>
        <Skeleton.Node active>
          <PieChartOutlined />
        </Skeleton.Node>
      </div>
    );
  }

  if (!isLoading && pieData.length === 0) {
    return (
      <div className={cls.chartContainer}>
        <div className={cls.chartTitle}>Распределение решений</div>
        <div className={cls.chartPlaceholder}>Нет данных за выбранный период</div>
      </div>
    );
  }

  return (
    <div className={cls.chartContainer}>
      <div className={cls.chartTitle}>Распределение решений</div>
      <div className={cls.chartBody}>
        <Pie {...config} />
      </div>
    </div>
  );
});
