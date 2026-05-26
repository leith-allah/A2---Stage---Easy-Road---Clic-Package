
import {
  Notification,
} from "@/types/notification.types";

export let mockNotifications:
  Notification[] = [
  {
    id: 1,

    title:
      "Bienvenue",

    message:
      "Votre compte a été créé.",

    type: "SUCCESS",

    createdAt: "2026-05-20",

    read: false,
  },
];

export async function
getNotifications() {
  return mockNotifications;
}

type CreateNotificationData = {
  title: string;

  message: string;

  type: Notification["type"];
};

export async function
createNotification(
  data: CreateNotificationData
) {

  const notification:
    Notification = {
      id: Date.now(),

      title: data.title,

      message:
        data.message,

      type: data.type,

      createdAt:
        new Date().toISOString(),

      read: false,
    };

  mockNotifications.unshift(
    notification
  );

  return notification;
}

export async function
markAsRead(id: number) {

  mockNotifications =
    mockNotifications.map(
      (notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
    );

  return mockNotifications;
}
