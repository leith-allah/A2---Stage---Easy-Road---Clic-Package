
export type NotificationType =
  | "SUCCESS"
  | "INFO"
  | "WARNING"
  | "ERROR";

export type Notification = {
  id: number;

  title: string;

  message: string;

  type: NotificationType;

  createdAt: string;

  read: boolean;
};
