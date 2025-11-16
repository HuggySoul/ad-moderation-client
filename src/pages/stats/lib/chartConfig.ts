export interface ChartPalette {
  success: string;
  error: string;
  warning: string;
  axisText: string;
}

export function getChartPalette(mode: "light" | "dark"): ChartPalette {
  if (mode === "dark") {
    return {
      success: "#22c55e",
      error: "#fb7185",
      warning: "#eab308",
      axisText: "#e5e5e5",
    };
  }

  return {
    success: "#16a34a",
    error: "#dc2626",
    warning: "#d97706",
    axisText: "#0f172a",
  };
}
