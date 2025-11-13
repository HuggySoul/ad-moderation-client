import cls from "./adList.module.css";

/** Корневой компонент страницы со списком объявлений */
export function AdList() {
  return (
    <div className={cls.AdList}>
      <h1>Список объявлений</h1>
    </div>
  );
}
