import cls from "./adList.module.css";
import { AdCardList } from "@/widgets/adCardList";

/** Корневой компонент страницы со списком объявлений */
export function AdList() {
  return (
    <div className={cls.AdList}>
      <AdCardList />
    </div>
  );
}
