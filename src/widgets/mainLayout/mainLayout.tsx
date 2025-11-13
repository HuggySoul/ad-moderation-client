import cls from "./mainLayout.module.css";
import { Outlet } from "react-router-dom";
import { ThemeSwitcher } from "@/features/changeAppTheme";

/** Корневой layout приложения */
export function MainLayout() {
  return (
    <div className={cls.mainLayout}>
      <header className={cls.header}>
        <h1>Модерация объявлений</h1>
        <ThemeSwitcher />
      </header>
      <main className={cls.main}>
        <Outlet />
      </main>
    </div>
  );
}
