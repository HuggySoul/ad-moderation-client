import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./appRouter";
import { ChangeAppThemeProvider } from "@/features/changeAppTheme";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChangeAppThemeProvider>
      <AppRouter />
    </ChangeAppThemeProvider>
  </StrictMode>
);
