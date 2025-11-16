import cls from "./adList.module.css";
import { useGetAdsListQuery } from "./api/getAdList";
import { useState, useRef } from "react";
import { AdCard } from "./ui/adCard/adCard";
import { AdCardSkeleton } from "./ui/adCard/adCardSkeleton";
import { Pagination, Result } from "antd";
import { FileSearchOutlined, CloseSquareFilled } from "@ant-design/icons";
import { Search } from "./ui/search/search";
import { Filters } from "./ui/filters/filters";
import { useActiveFilters } from "./model/hooks/useActiveFilter";
import { Sort } from "./ui/sort/sort";
import { useNavigate } from "react-router-dom";
import type { SortConfig } from "./model/types/sort.type";

/** Максимальное количество объявлений на одной странице */
const PAGE_SIZE = 10;

/** Количество скелетонов объявлений на странице */
const SKELETONS_COUNT = Array.from({ length: PAGE_SIZE });

/** Список карточек с объявлениями */
export function AdList() {
  const [page, setPage] = useState(1);
  const { filters, setStatus, resetFilters, setPriceRange, setCategoryID } =
    useActiveFilters();
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const {
    data: res,
    isLoading,
    isFetching,
    isError,
  } = useGetAdsListQuery({
    page,
    limit: PAGE_SIZE,
    search: searchQuery,
    status: filters.status,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    categoryId: filters.categoryID,
    sortBy: sortConfig?.orderBy,
    sortOrder: sortConfig?.order,
  });

  // Для управления прокруткой
  const listRef = useRef<HTMLUListElement | null>(null);

  const ads = res?.ads ?? [];
  const isSkeletonVisible = isLoading || isFetching;

  const changePage = (page: number) => {
    setPage(page);
    listRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const applySearch = (searchInput: string) => {
    setSearchQuery(searchInput);
    changePage(1);
  };

  return (
    <div className={cls.cardListMain}>
      <div className={cls.adCardListHeader}>
        <div className={cls.headerBtns}>
          <Filters
            filters={filters}
            setPriceRange={setPriceRange}
            reset={resetFilters}
            setStatus={setStatus}
            setCategoryID={setCategoryID}
            changePage={changePage}
          />
          <Sort sortParams={sortConfig} setSortParams={setSortConfig} />
        </div>
        <Search
          onSearch={applySearch}
          isLoading={!!searchQuery && (isLoading || isFetching)}
        />
      </div>

      {/* Показываем карточки или скелетон */}
      <ul ref={listRef} className={cls.adCardList}>
        {!isSkeletonVisible ? (
          <>
            {ads.map((ad, index) => (
              <li key={ad.id}>
                <AdCard
                  key={ad.id}
                  advertisement={ad}
                  onOpen={() =>
                    navigate(`/item/${ad.id}`, {
                      state: {
                        fromList: true,
                        page,
                        ids: ads.map((item) => item.id),
                        index,
                      },
                    })
                  }
                />
              </li>
            ))}
          </>
        ) : (
          <>
            {SKELETONS_COUNT.map((_, index) => (
              <li key={`skeleton-${index}`}>
                <AdCardSkeleton />
              </li>
            ))}
          </>
        )}
      </ul>

      {/* Поиск/фильтрация ничего не нашли */}
      {ads.length === 0 && !isLoading && !isFetching && !isError && (
        <Result icon={<FileSearchOutlined />} title="Ничего не нашлось :(" />
      )}

      {/* Ошибка получения данных */}
      {ads.length === 0 && isError && (
        <Result
          icon={<CloseSquareFilled />}
          title="Ошибка загрузки. Проверьте работу сервера или перезагрузите страницу"
        />
      )}

      {ads.length > 0 && (
        <Pagination
          onChange={changePage}
          align="center"
          showSizeChanger={false}
          showTotal={(total) => `Всего: ${total}`}
          className={cls.adCardListPagination}
          defaultCurrent={1}
          total={res?.pagination.totalItems}
          pageSize={res?.pagination.itemsPerPage}
          current={res?.pagination.currentPage}
        />
      )}
    </div>
  );
}
