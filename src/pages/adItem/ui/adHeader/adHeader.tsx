import cls from "./adHeader.module.css";
import type { AdvertisementDto } from "@/shared/types";
import { getStatusLabelStyleByValue } from "@/shared/models";
import { formatDate } from "@/shared/lib";
import { Typography, Tag } from "antd";

interface IProps {
  adItem: AdvertisementDto;
}

/** Шапка страницы объявления */
export function AdHeader({ adItem }: IProps) {
  const adStatus = getStatusLabelStyleByValue(adItem.status);
  const createdAt = formatDate(adItem.createdAt);
  const updatedAt = formatDate(adItem.updatedAt);
  return (
    <div>
      <Typography.Title level={2} className={cls.title}>
        {adItem.title}
      </Typography.Title>
      <div className={cls.headInfo}>
        <div className={cls.tagsRow}>
          <Tag className={cls.tag}>{adItem.category}</Tag>
          {adItem.priority === "urgent" && (
            <Tag color="red" className={cls.tag}>
              Срочно
            </Tag>
          )}
          <Tag className={cls.tag} color={adStatus.color}>
            {adStatus.text}
          </Tag>
        </div>
        <div className={cls.metaRow}>
          <Typography.Text type="secondary">
            Размещено: {createdAt.day}.{createdAt.month}.{createdAt.year} в{" "}
            {createdAt.hour}:{createdAt.minute}
          </Typography.Text>
          <Typography.Text type="secondary">
            Обновлено: {updatedAt.day}.{updatedAt.month}.{updatedAt.year} в{" "}
            {updatedAt.hour}:{updatedAt.minute}
          </Typography.Text>
        </div>
      </div>
    </div>
  );
}
