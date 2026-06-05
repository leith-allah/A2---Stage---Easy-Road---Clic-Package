
import {
  notificationService,
}
from "@/server/services/notification.service";

type Params = {

  params: Promise<{
    id: string;
  }>;

};

export async function GET(
  _: Request,
  { params }: Params
) {

  const { id } =
    await params;

  const notification =
    await notificationService.getNotificationById(
      Number(id)
    );

  return Response.json(
    notification
  );

}
