
export type NotificationType =
  | "SUCCESS"
  | "INFO"
  | "WARNING"
  | "ERROR";

export type NotificationCategory =
  | "BOOKING"
  | "PAYMENT"
  | "PACKAGE"
  | "WALLET"
  | "SYSTEM";

export type Notification = {
  id: number;

  title: string;

  message: string;

  type: NotificationType;

  category: NotificationCategory;

  createdAt: string;

  read: boolean;
};
