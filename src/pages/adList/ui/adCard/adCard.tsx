import cls from "./adCard.module.css";
import type { AdvertisementViewCard } from "../../model/types/adCard.type";
import { Card, Image, Tag, Typography, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { formatPrice } from "@/shared/lib";
import { formatDate } from "@shared/lib/formatDate";
import { getStatusLabelStyleByValue } from "@shared/models/";

interface IProps {
  advertisement: AdvertisementViewCard;
  onOpen: () => void;
}

/** Карточка объявления */
export function AdCard({ advertisement, onOpen }: IProps) {
  const { day, month, year, hour, minute } = formatDate(advertisement.createdAt);
  const adStatus = getStatusLabelStyleByValue(advertisement.status);
  const isShowPriority = advertisement.priority === "urgent";

  return (
    <Card>
      <div className={cls.adCard}>
        <Image
          width={233}
          className={cls.image}
          src={advertisement.images[0]}
          alt="Изображение товара"
        />
        <div className={cls.info}>
          <div className={cls.header}>
            <div className={cls.topInfo}>
              <Typography.Text strong className={cls.title}>
                {advertisement.title}
              </Typography.Text>
              <Typography.Text strong className={cls.price}>
                {formatPrice(advertisement.price)} ₽
              </Typography.Text>
              <Typography.Text className={cls.category}>
                {advertisement.category}
              </Typography.Text>
              <Button
                onClick={onOpen}
                title="Перейти на страницу объявления"
                className={cls.openBtn}
                icon={<ArrowRightOutlined />}
                iconPosition="end"
              >
                Открыть
              </Button>
            </div>
            <div className={cls.rightInfo}>
              <div className={cls.tags}>
                <Tag className={cls.tag} color={adStatus.color}>
                  {adStatus.text}
                </Tag>
                {isShowPriority && (
                  <Tag className={cls.tag} color={"error"}>
                    срочное
                  </Tag>
                )}
              </div>
              <div className={cls.bottomInfo}>
                <Typography.Text className={cls.date}>
                  Создано {day}.{month}.{year} в {hour}:{minute}
                </Typography.Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
