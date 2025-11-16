import { Button } from "antd";
import { MoonFilled, SunFilled } from "@ant-design/icons";
import { useTheme } from "../../model/context";
import cls from "./themeSwitcher.module.css";

export function ThemeSwitcher() {
  const { mode, toggle } = useTheme();
  const isDark = mode === "dark";

  return (
    <Button
      className={cls.themeSwitcher}
      type="text"
      onClick={toggle}
      icon={isDark ? <SunFilled /> : <MoonFilled />}
    >
      <span className={cls.content}>{isDark ? "Светлая" : "Тёмная"}</span>
    </Button>
  );
}
