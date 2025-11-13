import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./context";
import { readStoredMode, persistMode } from "./storage";
import type { ThemeMode, ThemeContextValue } from "./theme.types";

/** Провайдер состояние темы (light/dark), синхронизирует с localStorage и выставляет атрибуты на <html> */
export function AppThemeStateProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(readStoredMode);

  const setMode = useCallback((m: ThemeMode) => setModeState(m), []);
  const toggle = useCallback(
    () => setModeState((prev) => (prev === "dark" ? "light" : "dark")),
    []
  );

  useEffect(() => {
    persistMode(mode);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", mode);
      document.documentElement.style.colorScheme = mode;
    }
  }, [mode]);

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, setMode, toggle }),
    [mode, setMode, toggle]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
