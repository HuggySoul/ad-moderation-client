import cls from "./moderationMenu.module.css";
import { Card, Button } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  UnorderedListOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  UndoOutlined,
} from "@ant-design/icons";

/** Меню модератора */
export function ModerationMenu() {
  return (
    <Card className={cls.menuCard}>
      <div className={cls.moderationMenu}>
        <div className={cls.centerBtns}>
          <Button
            className={`${cls.decideBtn} ${cls.approve}`}
            icon={<CheckCircleOutlined />}
          >
            <span className={cls.decideText}>Одобрить</span>
          </Button>

          <Button className={`${cls.decideBtn} ${cls.reject}`} icon={<CloseOutlined />}>
            <span className={cls.decideText}>Отклонить</span>
          </Button>

          <Button className={`${cls.decideBtn} ${cls.change}`} icon={<UndoOutlined />}>
            <span className={cls.decideText}>Доработка</span>
          </Button>
        </div>

        <div className={cls.rightBtns}>
          <Button
            className={`${cls.navBtn} ${cls.navBack}`}
            icon={<UnorderedListOutlined />}
          >
            <span className={cls.navText}>Назад к списку</span>
          </Button>

          <Button className={`${cls.navBtn} ${cls.navPrev}`} icon={<ArrowLeftOutlined />}>
            <span className={cls.navText}>Предыдущее</span>
          </Button>

          <Button
            iconPosition="end"
            className={`${cls.navBtn} ${cls.navNext}`}
            icon={<ArrowRightOutlined />}
          >
            <span className={cls.navText}>Следующее</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
