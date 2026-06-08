
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

  async createNotification(
    data: {

      userId: number;

      status: string;

      amount: number;

      comment?: string;

    }
  ) {

    return notificationRepository.create(
      data
    );

  },

  async updateNotification(
    id: number,
    data: {

      status?: string;

      comment?: string;

    }
  ) {

    await this.getNotificationById(
      id
    );

    return notificationRepository.update(
      id,
      data
    );

  },

  async deleteNotification(
    id: number
  ) {

    await this.getNotificationById(
      id
    );

    return notificationRepository.delete(
      id
    );

  },

};
