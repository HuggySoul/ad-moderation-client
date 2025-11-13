import type { ThemeMode } from "./theme.types";

const KEY = "theme-mode"; // ключ в localStorage

/** Получаем значение темы из local storage */
export function readStoredMode(): ThemeMode {
  if (typeof window === "undefined") return "light";

  const raw = window.localStorage.getItem(KEY);
  return raw === "dark" ? "dark" : "light";
}

/** Сохраняем значение темы в local storage */
export function persistMode(mode: ThemeMode): void {
  try {
    window.localStorage.setItem(KEY, mode);
  } catch {
    console.error("Failed to save theme mode to localStorage");
  }
}
