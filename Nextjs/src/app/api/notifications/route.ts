
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
