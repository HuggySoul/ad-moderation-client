import cls from "./filters.module.css";
import { Button, Drawer, Select, Form, Slider } from "antd";
import { FilterFilled } from "@ant-design/icons";
import type { AdStatus } from "@shared/types";
import type { ActiveFilters } from "../../model/types/filter.type";
import { useGetCategoriesQuery } from "../../api/categories";
import { STATUS_LABELS } from "@/shared/models";
import type { FiltersFormValues } from "../../model/types/filter.type";
import { useState } from "react";

interface IProps {
  filters: ActiveFilters;
  setStatus: (status: AdStatus[]) => void;
  reset: () => void;
  setPriceRange: (minPrice?: number, maxPrice?: number) => void;
  setCategoryID: (categoryID?: number) => void;
  changePage: (page: number) => void;
}

/** Положение меню относительно экрана */
const PLACEMENT = "left";

/** максимум для слайдера(на основе того, как сервер генерирует данные)*/
const MAX_PRICE = 100_000;
const DEFAULT_PRICE_RANGE: [number, number] = [0, MAX_PRICE];

/** опции для выбора статуса */
const STATUS_SELECT_OPTIONS = Object.entries(STATUS_LABELS).map(([value, label]) => ({
  value,
  label,
}));

/** Преобразование внешних фильтров в значения формы */
const getFormValuesFromFilters = (filters: ActiveFilters): FiltersFormValues => ({
  status: filters.status ?? [],
  price:
    typeof filters.minPrice === "number" && typeof filters.maxPrice === "number"
      ? [filters.minPrice, filters.maxPrice]
      : null,
  categoryId: filters.categoryID ?? null,
});

/** Меню с фильтрами */
export function Filters({
  filters,
  setStatus,
  reset,
  setPriceRange,
  setCategoryID,
  changePage,
}: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const { data, isLoading: isCategoriesLoading } = useGetCategoriesQuery();

  const openDrawer = () => {
    setIsOpen(true);
    form.setFieldsValue(getFormValuesFromFilters(filters));
  };

  const handleSubmit = () => {
    const { status, price, categoryId } = form.getFieldsValue();

    // Статус
    setStatus(status ?? []);

    // Цена
    if (Array.isArray(price)) {
      const [min, max] = price;

      // если диапазон полный — считаем, что фильтра по цене нет
      const [defaultMin, defaultMax] = DEFAULT_PRICE_RANGE;
      if (min === defaultMin && max === defaultMax) {
        setPriceRange(undefined, undefined);
      } else {
        setPriceRange(min, max);
      }
    } else {
      // слайдер не трогали / поле очищено
      setPriceRange(undefined, undefined);
    }

    // Категория
    setCategoryID(categoryId ?? undefined);

    changePage(1);
    setIsOpen(false);
  };

  /** Сбросить фильтры */
  const handleReset = () => {
    reset();
    form.resetFields();
    setIsOpen(false);
  };

  const categoryOptions =
    data?.categories?.map((category) => ({
      value: category.id,
      label: category.name,
    })) ?? [];

  return (
    <>
      <Button
        onClick={openDrawer}
        size="large"
        type="primary"
        icon={<FilterFilled />}
        iconPosition="end"
      >
        Фильтры
      </Button>

      <Drawer
        title="Фильтры"
        placement={PLACEMENT}
        closable={false}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        key={PLACEMENT}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="status" label="Фильтр по статусу">
            <Select
              size="large"
              mode="multiple"
              options={STATUS_SELECT_OPTIONS}
              placeholder="Выберите статус"
              allowClear
            />
          </Form.Item>

          <Form.Item name="categoryId" label="Категория">
            <Select
              size="large"
              options={categoryOptions}
              loading={isCategoriesLoading}
              placeholder="Выберите категорию"
              allowClear
            />
          </Form.Item>

          <Form.Item name="price" label="Фильтр по цене, ₽">
            <Slider
              range
              min={0}
              max={MAX_PRICE}
              step={1_000}
              tooltip={{ formatter: (value) => `${value?.toLocaleString("ru-RU")} ₽` }}
            />
          </Form.Item>

          <div className={cls.submitBtns}>
            <Form.Item>
              <Button type="primary" onClick={handleReset}>
                Сбросить
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" onClick={handleSubmit}>
                Применить
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Drawer>
    </>
  );
}
