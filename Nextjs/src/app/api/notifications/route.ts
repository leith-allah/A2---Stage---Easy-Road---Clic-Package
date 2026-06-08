
import {
  notificationService,
}
from "@/server/services/notification.service";

export async function GET() {

  const notifications =
    await notificationService.getAllNotifications();

  return Response.json(
    notifications
  );

}

export async function POST(
  request: Request
) {

  const body =
    await request.json();

  const notification =
    await notificationService.createNotification({

      userId:
        body.userId,

      status:
        body.status,

      amount:
        body.amount,

      comment:
        body.comment,

    });

  return Response.json(
    notification,
    {
      status: 201,
    }
  );

}
