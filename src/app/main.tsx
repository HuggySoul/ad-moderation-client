import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./appRouter";
import { ChangeAppThemeProvider } from "@/features/changeAppTheme";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ChangeAppThemeProvider>
        <AppRouter />
      </ChangeAppThemeProvider>
    </Provider>
  </StrictMode>
);
