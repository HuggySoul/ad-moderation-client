import cls from "./adItem.module.css";
import { useParams } from "react-router-dom";
import { useGetAdItemQuery } from "./api/getAdItem";

/** Подробная информация об объявлении */
export function AdItem() {
  const { id } = useParams();
  const { data: adItem } = useGetAdItemQuery({ id: Number(id) || 0 });

  console.log(adItem);
  return <div className={cls.adItem}></div>;
}
