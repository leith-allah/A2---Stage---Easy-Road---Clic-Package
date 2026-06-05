
import {
  notificationRepository,
}
from "@/server/repositories/notification.repository";

import {
  NotFoundException,
}
from "@/server/utils/api-error";

export const notificationService = {

  async getAllNotifications() {

    return notificationRepository.findAll();

  },

  async getNotificationById(
    id: number
  ) {

    const notification =
      await notificationRepository.findById(
        id
      );

    if (!notification) {

      throw new NotFoundException(
        "Notification introuvable"
      );

    }

    return notification;

  },

};
