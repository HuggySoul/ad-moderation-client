import cls from "./adCardList.module.css";
import { useGetAdsListQuery } from "./api/getAdList";
import { AdCard } from "./ui/adCard/adCard";
import { AdCardSkeleton } from "./ui/adCard/adCardSkeleton";

/** Список карточек с объявлениями */
export function AdCardList() {
  const { data: res, isLoading, isFetching } = useGetAdsListQuery();
  const ads = res?.ads ?? [];

  const showSkeleton = isLoading || (isFetching && ads.length === 0);
  const skeletonItems = Array.from({ length: 10 });

  return (
    <div>
      <ul className={cls.adCardList}>
        {showSkeleton &&
          skeletonItems.map((_, index) => (
            <li key={`skeleton-${index}`}>
              <AdCardSkeleton />
            </li>
          ))}

        {!showSkeleton &&
          ads.map((ad) => (
            <li key={ad.id}>
              <AdCard advertisement={ad} />
            </li>
          ))}
      </ul>
    </div>
  );
}
