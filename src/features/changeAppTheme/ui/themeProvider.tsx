import { ConfigProvider, App as AntdApp } from "antd";
import { AppThemeStateProvider } from "../model/themeStateProvider";
import { useTheme } from "../model/context";
import { getThemeConfig } from "../model/themeConfig";

/** Внутренний провайдер, зависящий от состояния темы */
function AntdThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode } = useTheme();
  const theme = getThemeConfig(mode);
  return (
    <ConfigProvider theme={theme}>
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
}

/** Глобальный провайдер для управления темой приложения */
export function ChangeAppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppThemeStateProvider>
      <AntdThemeProvider>{children}</AntdThemeProvider>
    </AppThemeStateProvider>
  );
}
