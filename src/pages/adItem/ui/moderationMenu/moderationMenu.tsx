import cls from "./moderationMenu.module.css";
import { Card, Button, Popover } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  UnorderedListOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { useApproveAdMutation } from "../../api/moderateAd";
import { ModerationReasonForm } from "./moderationReasonForm";
import { usePopoverControl } from "./usePopoverControl";
import { useNavigate } from "react-router-dom";

interface IProps {
  id: number;
  onGoPrev: () => void;
  onGoNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

/** Меню модератора */
export function ModerationMenu({ id, onGoPrev, onGoNext, canGoPrev, canGoNext }: IProps) {
  const [approveAd, { isLoading: isApproving }] = useApproveAdMutation();

  const navigate = useNavigate();

  const {
    isRejectPopoverOpen,
    isRequestChangesPopoverOpen,
    handleOpenRejectChange,
    handleOpenRequestChangesChange,
    handleCloseAll,
  } = usePopoverControl();

  const handleApprove = async () => {
    try {
      await approveAd({ id }).unwrap();
    } catch (error: unknown) {
      console.error("Ошибка при одобрении:", error);
    }
  };

  return (
    <Card className={cls.menuCard}>
      <div className={cls.moderationMenu}>
        <div className={cls.centerBtns}>
          <Button
            onClick={handleApprove}
            loading={isApproving}
            className={`${cls.decideBtn} ${cls.approve}`}
            icon={<CheckCircleOutlined />}
          >
            <span className={cls.decideText}>Одобрить</span>
          </Button>

          <Popover
            title="Отклонение"
            trigger="click"
            placement="top"
            arrow={false}
            open={isRejectPopoverOpen}
            onOpenChange={handleOpenRejectChange}
            content={
              <ModerationReasonForm id={id} mode="reject" onSuccess={handleCloseAll} />
            }
          >
            <Button className={`${cls.decideBtn} ${cls.reject}`} icon={<CloseOutlined />}>
              <span className={cls.decideText}>Отклонить</span>
            </Button>
          </Popover>

          <Popover
            title="Доработка"
            trigger="click"
            placement="top"
            arrow={false}
            open={isRequestChangesPopoverOpen}
            onOpenChange={handleOpenRequestChangesChange}
            content={
              <ModerationReasonForm
                id={id}
                mode="requestChanges"
                onSuccess={handleCloseAll}
              />
            }
          >
            <Button className={`${cls.decideBtn} ${cls.change}`} icon={<UndoOutlined />}>
              <span className={cls.decideText}>Доработка</span>
            </Button>
          </Popover>
        </div>

        <div className={cls.rightBtns}>
          <Button
            onClick={() => navigate(`/list`)}
            className={`${cls.navBtn} ${cls.navBack}`}
            icon={<UnorderedListOutlined />}
          >
            <span className={cls.navText}>Назад к списку</span>
          </Button>

          <Button
            onClick={onGoPrev}
            disabled={!onGoPrev || !canGoPrev}
            className={`${cls.navBtn} ${cls.navPrev}`}
            icon={<ArrowLeftOutlined />}
          >
            <span className={cls.navText}>Предыдущее</span>
          </Button>

          <Button
            onClick={onGoNext}
            disabled={!onGoNext || !canGoNext}
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
