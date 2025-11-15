import { useParams } from "react-router-dom";
import { useGetAdItemQuery } from "./api/getAdItem";
import { Carousel, Image, Result, Skeleton, Card, Typography, Table } from "antd";
import { CloseSquareFilled } from "@ant-design/icons";
import type { AdvertisementDto } from "@/shared/types";
import { SellerCard } from "./ui/sellerCard/sellerCard";
import { AdHeader } from "./ui/adHeader/adHeader";
import { ModerationMenu } from "./ui/moderationMenu/moderationMenu";
import { ModerationHistory } from "./ui/moderationHistory/moderationHistory";
import cls from "./adItem.module.css";

/** Предикат для сужения типа */
const adItemNotUndefined = (
  adItem: AdvertisementDto | undefined
): adItem is AdvertisementDto => {
  return adItem !== undefined;
};

/** Подробная информация об объявлении */
export function AdItem() {
  const { id } = useParams();
  const numericId = Number(id);
  const {
    data: adItem,
    isLoading,
    isFetching,
  } = useGetAdItemQuery({
    id: Number.isNaN(numericId) ? 0 : numericId,
  });

  if (isLoading || isFetching) {
    return (
      <div className={cls.adItemSkeletonWrapper}>
        <Skeleton active avatar paragraph={{ rows: 6 }} />
      </div>
    );
  }

  if (!adItemNotUndefined(adItem))
    return (
      <Result icon={<CloseSquareFilled />} title="404" subTitle="Объявление не найдено" />
    );

  const hasImages = Array.isArray(adItem.images) && adItem.images.length > 0;

  const characteristicsData = Object.entries(adItem.characteristics).map(
    ([key, value]) => ({
      key,
      name: key,
      value,
    })
  );

  return (
    <div className={cls.adItem}>
      <AdHeader adItem={adItem} />

      <div className={cls.topInfo}>
        {hasImages && (
          <div className={cls.galleryWrapper}>
            <Carousel dots={false} className={cls.adItemCarousel} arrows>
              {adItem.images.map((src, index) => (
                <div className={cls.adItemSlide} key={src || index}>
                  <Image
                    src={src}
                    alt={`Фотография ${index + 1}`}
                    className={cls.adItemImage}
                    preview={false}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        )}

        <div className={cls.sellerPrice}>
          <Typography.Text className={cls.price}>
            {adItem.price.toLocaleString("ru-RU")} ₽
          </Typography.Text>
          <SellerCard seller={adItem.seller} />
        </div>
      </div>

      <Card title="Описание">
        <Typography.Paragraph className={cls.descriptionText}>
          {adItem.description}
        </Typography.Paragraph>
      </Card>

      <Card title="Характеристики товара">
        <Table
          size="small"
          pagination={false}
          columns={[
            {
              title: "Характеристика",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Значение",
              dataIndex: "value",
              key: "value",
            },
          ]}
          dataSource={characteristicsData}
        />
      </Card>
      <ModerationHistory moderationHistory={adItem.moderationHistory} />
      <ModerationMenu />
    </div>
  );
}
