
export type NotificationType =
  | "SUCCESS"
  | "WARNING"
  | "ERROR"
  | "INFO";

export type NotificationCategory =
  | "BOOKING"
  | "PAYMENT"
  | "ACCOUNT"
  | "PACKAGE"
  | "SYSTEM";

export type Notification = {
  id: number;

  title: string;

  message: string;

  type: NotificationType;

  category: NotificationCategory;

  read: boolean;

  createdAt: string;
};
