import cls from "./sellerCard.module.css";
import type { SellerDto } from "@/shared/types";
import { Card, Typography, Tag, Rate } from "antd";

interface IProps {
  seller: SellerDto;
}

/** Карточка продавца */
export function SellerCard({ seller }: IProps) {
  return (
    <Card title="Информация о продавце" className={cls.sellerCard}>
      <div className={cls.header}>
        <Typography.Text className={cls.name}>{seller.name}</Typography.Text>
        <Tag className={cls.idTag}>ID: {seller.id}</Tag>
      </div>

      <div className={cls.infoRow}>
        <Typography.Text className={cls.label}>Рейтинг:</Typography.Text>
        <Rate allowHalf disabled value={Number(seller.rating)} className={cls.label} />
        <Typography.Text className={cls.ratingValue}>{seller.rating}</Typography.Text>
      </div>

      <div className={cls.infoRow}>
        <Typography.Text className={cls.label}>Объявлений:</Typography.Text>
        <Typography.Text strong>{seller.totalAds}</Typography.Text>
      </div>

      <div className={cls.infoRow}>
        <Typography.Text className={cls.label}>На сайте с </Typography.Text>
        <Typography.Text>
          {new Date(seller.registeredAt).toLocaleDateString("ru-RU")}
        </Typography.Text>
      </div>
    </Card>
  );
}
