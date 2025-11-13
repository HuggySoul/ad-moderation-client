import cls from "./adList.module.css";
import { Card } from "antd";

/** Корневой компонент страницы со списком объявлений */
export function AdList() {
  return (
    <div className={cls.AdList}>
      <Card>Карточка </Card>
    </div>
  );
}
