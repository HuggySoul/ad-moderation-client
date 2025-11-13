import { createContext, useContext } from "react";
import type { ThemeContextValue } from "./theme.types";

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("Theme context error");
  }
  return ctx;
}
