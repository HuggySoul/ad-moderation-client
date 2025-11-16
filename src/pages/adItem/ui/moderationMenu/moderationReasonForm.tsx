import { useState } from "react";
import { Form, Radio, Input, Button } from "antd";
import type { RadioChangeEvent } from "antd";
import cls from "./moderationMenu.module.css";
import { MODERATION_REASONS } from "@shared/models";
import type { ModerationDecisionReason } from "@/shared/types";
import { useRejectAdMutation, useRequestChangesAdMutation } from "../../api/moderateAd";

type ModerationFormMode = "reject" | "requestChanges";

interface ModerationReasonFormProps {
  id: number;
  mode: ModerationFormMode;
  onSuccess: () => void;
}

interface ModerationReasonFormValues {
  reason: ModerationDecisionReason;
  customReason?: string;
}

/** Универсальная форма модерации (Отклонить / Доработка) */
export function ModerationReasonForm({ id, mode, onSuccess }: ModerationReasonFormProps) {
  const [form] = Form.useForm<ModerationReasonFormValues>();
  const [selectedReason, setSelectedReason] = useState<ModerationDecisionReason | null>(
    null
  );

  const [rejectAd, { isLoading: isRejecting }] = useRejectAdMutation();
  const [requestChangesAd, { isLoading: isRequesting }] = useRequestChangesAdMutation();

  const handleReasonChange = (e: RadioChangeEvent) => {
    setSelectedReason(e.target.value as ModerationDecisionReason);
  };

  const handleFinish = async (values: ModerationReasonFormValues) => {
    const trimmedCustomReason = values.customReason?.trim();

    try {
      if (mode === "reject") {
        await rejectAd({
          id,
          body: {
            reason: values.reason,
            comment: trimmedCustomReason ?? "",
          },
        }).unwrap();
      } else {
        await requestChangesAd({
          id,
          body: {
            reason: values.reason,
            comment: trimmedCustomReason ?? "",
          },
        }).unwrap();
      }

      form.resetFields();
      setSelectedReason(null);
      onSuccess();
    } catch (error: unknown) {
      if (mode === "reject") {
        console.error("Ошибка при отклонении:", error);
      } else {
        console.error("Ошибка при запросе доработки:", error);
      }
    }
  };

  const customReasonPlaceholder =
    mode === "reject" ? "Введите причину отклонения" : "Опишите, что нужно доработать";

  const loading = mode === "reject" ? isRejecting : isRequesting;

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      className={cls.reasonForm}
      layout="vertical"
    >
      <Form.Item<ModerationReasonFormValues>
        name="reason"
        className={cls.reasonItem}
        rules={[{ required: true, message: "Выберите причину" }]}
      >
        <Radio.Group className={cls.reasonsGroup} onChange={handleReasonChange}>
          {MODERATION_REASONS.map((option) => (
            <Radio key={option.value} value={option.value} className={cls.reasonRadio}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>

      {selectedReason === "Другое" && (
        <Form.Item<ModerationReasonFormValues>
          name="customReason"
          className={cls.customReasonItem}
          rules={[
            {
              validator: (_, value) => {
                if (selectedReason !== "Другое") {
                  return Promise.resolve();
                }
                if (!value || !value.trim()) {
                  return Promise.reject(new Error("Укажите причину в поле ниже"));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            placeholder={customReasonPlaceholder}
            className={cls.customReasonInput}
          />
        </Form.Item>
      )}

      <Form.Item className={cls.submitItem}>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
          className={cls.submitBtn}
        >
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
}
