import { Card, Skeleton } from "antd";
import cls from "./adCard.module.css";

export function AdCardSkeleton() {
  return (
    <Card>
      <div className={cls.adCard}>
        {/* Левая колонка — картинка */}
        <div className={cls.imageSkeletonWrapper}>
          <Skeleton.Image active className={cls.imageSkeleton} />
        </div>

        {/* Правая колонка — текст и кнопки */}
        <div className={cls.info}>
          <div className={cls.header}>
            <div className={cls.topInfo}>
              <Skeleton.Input size="small" active className={cls.skeletonTitle} />
              <Skeleton.Input size="small" active className={cls.skeletonPrice} />
              <Skeleton.Input size="small" active className={cls.skeletonCategory} />
              <Skeleton.Button size="small" active className={cls.skeletonButton} />
            </div>

            <div className={cls.rightInfo}>
              <div className={cls.tags}>
                <Skeleton.Button active className={cls.skeletonTag} />
                <Skeleton.Button active className={cls.skeletonTag} />
              </div>
              <div className={cls.bottomInfo}>
                <Skeleton.Input active className={cls.skeletonDate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
