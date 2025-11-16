export function formatReviewTime(seconds?: number): string {
  if (seconds == null || Number.isNaN(seconds)) {
    return "—";
  }

  if (seconds < 60) {
    return `${seconds} с`;
  }

  const minutes = Math.floor(seconds / 60);
  const restSeconds = seconds % 60;

  if (restSeconds === 0) {
    return `${minutes} мин`;
  }

  return `${minutes} мин ${restSeconds} с`;
}

export function formatNumber(value?: number): string {
  if (value === undefined || Number.isNaN(value)) {
    return "—";
  }

  return value.toLocaleString();
}

export function formatPercent(value?: number): string {
  if (value === undefined || Number.isNaN(value)) {
    return "—";
  }

  return `${Math.round(value)}%`;
}
