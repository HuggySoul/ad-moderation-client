import cls from "./sort.module.css";
import { Button, Popover, Form, Radio } from "antd";
import { SortAscendingOutlined } from "@ant-design/icons";
import type { SortConfig, AdsSortBy, SortOrder } from "../../model/types/sort.type";

interface IProps {
  setSortParams: (params: SortConfig) => void;
  sortParams: SortConfig | null;
}

/** Меню сортировки */
export function Sort({ setSortParams, sortParams }: IProps) {
  const [form] = Form.useForm<SortConfig>();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      form.setFieldsValue({
        orderBy: sortParams?.orderBy ?? undefined,
        order: sortParams?.order ?? undefined,
      });
    }
  };

  const handleValuesChange = (_: unknown, allValues: SortConfig) => {
    setSortParams({
      orderBy: allValues.orderBy,
      order: allValues.order,
    });
  };

  return (
    <Popover
      title="Сортировка"
      trigger="click"
      placement="bottom"
      arrow={false}
      onOpenChange={handleOpenChange}
      content={
        <Form form={form} layout="vertical" onValuesChange={handleValuesChange}>
          <Form.Item<SortConfig> name="orderBy" label="Поле сортировки">
            <Radio.Group block buttonStyle="solid" className={cls.sortRadioGroup}>
              <Radio.Button
                value={"createdAt" satisfies AdsSortBy}
                className={cls.sortRadioButton}
              >
                Дата создания
              </Radio.Button>
              <Radio.Button
                value={"price" satisfies AdsSortBy}
                className={cls.sortRadioButton}
              >
                Цена
              </Radio.Button>
              <Radio.Button
                value={"priority" satisfies AdsSortBy}
                className={cls.sortRadioButton}
              >
                Приоритет
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item<SortConfig> name="order" label="Порядок">
            <Radio.Group block buttonStyle="solid" className={cls.sortRadioGroup}>
              <Radio.Button
                value={"desc" satisfies SortOrder}
                className={cls.sortRadioButton}
              >
                По убыванию
              </Radio.Button>
              <Radio.Button
                value={"asc" satisfies SortOrder}
                className={cls.sortRadioButton}
              >
                По возрастанию
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      }
    >
      <Button
        className={cls.sortButton}
        size="large"
        type="primary"
        icon={<SortAscendingOutlined />}
      />
    </Popover>
  );
}
