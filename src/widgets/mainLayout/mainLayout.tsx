import cls from "./mainLayout.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeSwitcher } from "@/features/changeAppTheme";
import { Button } from "antd";
import { LineChartOutlined } from "@ant-design/icons";

/** Корневой layout приложения */
export function MainLayout() {
  const navigate = useNavigate();

  return (
    <div className={cls.mainLayout}>
      <header className={cls.header}>
        <h1 className={cls.title}> Модерация объявлений</h1>
        <div className={cls.rightBtns}>
          <Button
            className={cls.statsBtn}
            type="text"
            icon={<LineChartOutlined />}
            onClick={() => navigate("/stats")}
          >
            <span className={cls.statsContent}>Статистика</span>
          </Button>
          <ThemeSwitcher />
        </div>
      </header>
      <main className={cls.main}>
        <Outlet />
      </main>
    </div>
  );
}
