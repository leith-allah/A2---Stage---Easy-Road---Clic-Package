
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

export async function PATCH(
  request: Request,
  { params }: Params
) {

  const { id } =
    await params;

  const body =
    await request.json();

  const notification =
    await notificationService.updateNotification(
      Number(id),
      body
    );

  return Response.json(
    notification
  );

}

export async function DELETE(
  _: Request,
  { params }: Params
) {

  const { id } =
    await params;

  await notificationService.deleteNotification(
    Number(id)
  );

  return Response.json({

    success: true,

  });

}
