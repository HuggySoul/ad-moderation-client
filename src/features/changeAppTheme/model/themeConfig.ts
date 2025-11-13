import { theme as antdTheme, type ThemeConfig } from "antd";
import type { ThemeMode } from "./theme.types";

/** Задаёт токены и пресеты компонентов */
export function getThemeConfig(mode: ThemeMode): ThemeConfig {
  const isDark = mode === "dark";

  const algorithm = isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;

  /** Палитра для светлой темы */
  const lightPalette = {
    primary: "#111827",
    primaryHover: "#020617",
    primaryActive: "#000000",
    primaryBg: "#e5e7eb",
    primaryBgHover: "#d4d4d4",

    bgBase: "#e5e7eb", // общий фон страницы
    bgLayout: "#e5e7eb", // фон layout
    bgContainer: "#ffffff", // фон основных контейнеров
    bgElevated: "#f9fafb", // фон поднятых элементов (карточки, модалки)
    bgMask: "rgba(15, 23, 42, 0.45)",

    border: "#cbd5e1",
    borderSecondary: "#e2e8f0",
    split: "#e2e8f0",

    text: "#0f172a",
    textSecondary: "#4b5563",
    textTertiary: "#6b7280",
    textDisabled: "#9ca3af",
    textHeading: "#111827",

    success: "#16a34a",
    successBg: "#dcfce7",
    warning: "#d97706",
    warningBg: "#fef3c7",
    error: "#dc2626",
    errorBg: "#fee2e2",
    info: "#0ea5e9",
    infoBg: "#e0f2fe",

    link: "#111827",
    linkHover: "#020617",
    linkActive: "#000000",

    controlOutline: "rgba(15, 23, 42, 0.35)",
  };

  /** Палитра для тёмной темы */
  const darkPalette = {
    primary: "#e5e5e5",
    primaryHover: "#fafafa",
    primaryActive: "#ffffff",
    primaryBg: "rgba(212, 212, 212, 0.12)",
    primaryBgHover: "rgba(229, 229, 229, 0.18)",

    bgBase: "#050505",
    bgLayout: "#050505",
    bgContainer: "#050505",
    bgElevated: "#111111",
    bgMask: "rgba(0, 0, 0, 0.78)",

    border: "#262626",
    borderSecondary: "#171717",
    split: "#262626",

    text: "#e5e5e5",
    textSecondary: "#a3a3a3",
    textTertiary: "#737373",
    textDisabled: "#525252",
    textHeading: "#fafafa",

    success: "#22c55e",
    successBg: "rgba(34, 197, 94, 0.16)",
    warning: "#eab308",
    warningBg: "rgba(234, 179, 8, 0.18)",
    error: "#fb7185",
    errorBg: "rgba(248, 113, 113, 0.18)",
    info: "#38bdf8",
    infoBg: "rgba(56, 189, 248, 0.18)",

    link: "#e5e5e5",
    linkHover: "#fafafa",
    linkActive: "#ffffff",

    controlOutline: "rgba(250, 250, 250, 0.35)",
  };

  const palette = isDark ? darkPalette : lightPalette;

  const token: ThemeConfig["token"] = {
    // Базовые цвета бренда и статусов
    colorPrimary: palette.primary,
    colorPrimaryHover: palette.primaryHover,
    colorPrimaryActive: palette.primaryActive,
    colorPrimaryBg: palette.primaryBg,
    colorPrimaryBgHover: palette.primaryBgHover,

    colorSuccess: palette.success,
    colorSuccessBg: palette.successBg,
    colorWarning: palette.warning,
    colorWarningBg: palette.warningBg,
    colorError: palette.error,
    colorErrorBg: palette.errorBg,
    colorInfo: palette.info,
    colorInfoBg: palette.infoBg,

    // Фоны
    colorBgBase: palette.bgBase,
    colorBgLayout: palette.bgLayout,
    colorBgContainer: palette.bgContainer,
    colorBgElevated: palette.bgElevated,
    colorBgMask: palette.bgMask,

    // Границы и разделители
    colorBorder: palette.border,
    colorBorderSecondary: palette.borderSecondary,
    colorSplit: palette.split,
    lineWidth: 1,
    lineType: "solid",

    // Текст
    colorText: palette.text,
    colorTextSecondary: palette.textSecondary,
    colorTextTertiary: palette.textTertiary,
    colorTextDisabled: palette.textDisabled,
    colorTextHeading: palette.textHeading,

    // Ссылки
    colorLink: palette.link,
    colorLinkHover: palette.linkHover,
    colorLinkActive: palette.linkActive,

    // Контуры/фокус
    controlOutline: palette.controlOutline,

    // Геометрия
    borderRadius: 8,
    borderRadiusSM: 6,
    borderRadiusLG: 12,

    controlHeight: 36,
    controlHeightSM: 28,
    controlHeightLG: 40,

    // Типографика
    fontSize: 14,
    fontSizeSM: 12,
    fontSizeLG: 16,

    fontSizeHeading1: 28,
    fontSizeHeading2: 24,
    fontSizeHeading3: 20,
    fontSizeHeading4: 18,
    fontSizeHeading5: 16,

    // Тени (для карточек/модалок)
    boxShadowSecondary: isDark
      ? "0 18px 40px rgba(0, 0, 0, 0.9)"
      : "0 10px 24px rgba(15, 23, 42, 0.18)",
  };

  return {
    algorithm,
    cssVar: true,
    token,
    components: {
      Button: {
        controlHeight: 36,
        borderRadius: 8,
        contentFontSize: 14,
        fontWeight: 600,

        defaultBg: isDark ? "#050505" : "#ffffff",
        defaultBorderColor: isDark ? "#404040" : "#cbd5e1",
        defaultColor: isDark ? "#e5e5e5" : "#111827",

        defaultHoverBg: isDark ? "#111111" : "#f9fafb",
        defaultHoverBorderColor: palette.primary,
        defaultHoverColor: palette.primary,

        defaultActiveBg: isDark ? "#050505" : "#e5e7eb",
        defaultActiveBorderColor: palette.primaryHover,
        defaultActiveColor: palette.primaryHover,

        borderColorDisabled: isDark ? "#262626" : "#e5e7eb",

        colorPrimary: palette.primary,
        colorPrimaryHover: palette.primaryHover,
        colorPrimaryActive: palette.primaryActive,

        primaryShadow: "none",
        defaultShadow: "none",
        dangerShadow: "none",

        iconGap: 8,
      },

      Card: {
        borderRadiusLG: 12,
        bodyPadding: 16,
        bodyPaddingSM: 12,
        headerPadding: 16,
        headerPaddingSM: 12,
        headerFontSize: 16,
        headerFontSizeSM: 14,

        headerBg: isDark ? "#050505" : "#f9fafb",
        actionsBg: isDark ? "#050505" : "#ffffff",

        extraColor: palette.textSecondary,

        colorBorderSecondary: palette.border,
        boxShadow: isDark
          ? "0 18px 40px rgba(0, 0, 0, 0.9)"
          : "0 10px 24px rgba(15, 23, 42, 0.18)",
      },

      Select: {
        controlHeight: 36,
        borderRadius: 8,

        selectorBg: isDark ? "#050505" : "#ffffff",

        activeBorderColor: palette.primary,
        hoverBorderColor: palette.primaryHover,

        optionFontSize: 14,
        optionHeight: 32,
        optionPadding: "5px 12px",

        optionActiveBg: isDark ? "rgba(82, 82, 82, 0.35)" : "rgba(148, 163, 184, 0.15)",
        optionSelectedBg: palette.primaryBg,
        optionSelectedColor: palette.text,
        optionSelectedFontWeight: 600,

        multipleItemBg: isDark ? "rgba(64, 64, 64, 0.45)" : "rgba(148, 163, 184, 0.16)",
        multipleItemBorderColor: isDark ? "#404040" : "#cbd5e1",
        multipleItemColorDisabled: palette.textDisabled,
        multipleSelectorBgDisabled: isDark
          ? "rgba(23, 23, 23, 0.8)"
          : "rgba(148, 163, 184, 0.06)",
      },

      Input: {
        controlHeight: 36,
        borderRadius: 8,
        inputFontSize: 14,
        paddingInline: 12,

        activeBg: isDark ? "#050505" : "#ffffff",
        hoverBg: isDark ? "#050505" : "#ffffff",

        activeBorderColor: palette.primary,
        hoverBorderColor: palette.primaryHover,

        activeShadow: isDark
          ? "0 0 0 1px rgba(250, 250, 250, 0.65)"
          : "0 0 0 1px rgba(15, 23, 42, 0.35)",

        errorActiveShadow: isDark
          ? "0 0 0 1px rgba(248, 113, 113, 0.8)"
          : "0 0 0 1px rgba(248, 113, 113, 0.55)",

        warningActiveShadow: isDark
          ? "0 0 0 1px rgba(234, 179, 8, 0.8)"
          : "0 0 0 1px rgba(234, 179, 8, 0.6)",
      },

      Checkbox: {
        borderRadiusSM: 4,
        colorPrimary: palette.primary,
        colorPrimaryHover: palette.primaryHover,
        colorBorder: palette.border,

        colorBgContainer: isDark ? "#050505" : "#ffffff",
      },

      Pagination: {
        controlHeight: 32,
        borderRadius: 6,

        colorText: palette.textSecondary,
        colorTextDisabled: palette.textDisabled,

        itemActiveBg: palette.primaryBg,
        itemActiveColor: palette.primaryActive,
        itemBg: isDark ? "#050505" : "#ffffff",
        itemLinkBg: isDark ? "#050505" : "#ffffff",

        colorPrimary: palette.primary,
      },

      Image: {
        borderRadiusLG: 10,
        colorBgMask: isDark ? "rgba(0, 0, 0, 0.82)" : "rgba(15, 23, 42, 0.75)",
        previewOperationColor: "rgba(255, 255, 255, 0.88)",
        previewOperationHoverColor: "#ffffff",
      },

      Tag: {
        borderRadiusSM: 6,
        fontSizeSM: 12,

        colorBorder: palette.border,
        colorBgContainer: isDark ? "#050505" : "#f9fafb",
        colorText: palette.textSecondary,
      },

      Modal: {
        borderRadiusLG: 12,
        paddingLG: 20,
        paddingContentHorizontalLG: 20,
        paddingContentVerticalLG: 16,

        colorBgElevated: isDark ? "#111111" : "#ffffff",
        colorBorderSecondary: palette.border,

        titleFontSize: 16,
        colorTextHeading: palette.textHeading,

        boxShadow: isDark
          ? "0 22px 45px rgba(0, 0, 0, 0.95)"
          : "0 12px 30px rgba(15, 23, 42, 0.22)",
      },
    },
  };
}
