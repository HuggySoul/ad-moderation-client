import cls from "./moderationHistory.module.css";
import { Card, Typography } from "antd";
import type { ModerationHistoryDto } from "@shared/types";
import { getActionLabel } from "@/shared/models/adModels";

interface IProps {
  moderationHistory: ModerationHistoryDto[];
}

/** Список с историей модерации */
export function ModerationHistory({ moderationHistory }: IProps) {
  const hasModerationHistory =
    Array.isArray(moderationHistory) && moderationHistory.length > 0;

  return (
    <Card title="История модерации" className={cls.moderationCard}>
      {!hasModerationHistory && (
        <Typography.Text className={cls.moderationEmpty}>
          Действий модерации пока нет.
        </Typography.Text>
      )}

      {hasModerationHistory && (
        <div className={cls.moderationList}>
          {moderationHistory.map((record) => (
            <div key={record.id} className={cls.moderationItem}>
              <div className={cls.moderationItemHeader}>
                <Typography.Text className={cls.moderationModerator}>
                  {record.moderatorName}
                </Typography.Text>
                <Typography.Text className={cls.moderationDate}>
                  {new Date(record.timestamp).toLocaleString("ru-RU")}
                </Typography.Text>
              </div>

              <div className={cls.moderationRow}>
                <Typography.Text className={cls.moderationLabel}>
                  Решение:
                </Typography.Text>
                <Typography.Text>{getActionLabel(record.action)}</Typography.Text>
              </div>

              {record.reason && (
                <div className={cls.moderationRow}>
                  <Typography.Text className={cls.moderationLabel}>
                    Причина:
                  </Typography.Text>
                  <Typography.Text>{record.reason}</Typography.Text>
                </div>
              )}

              {record.comment.trim() !== "" && (
                <div className={cls.moderationRow}>
                  <Typography.Text className={cls.moderationLabel}>
                    Комментарий:
                  </Typography.Text>
                  <Typography.Text>{record.comment}</Typography.Text>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
