
import { transportService }
from "@/server/services/transport.service";

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

  const transport =
    await transportService.getTransportById(
      Number(id)
    );

  return Response.json(
    transport
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

  const transport =
    await transportService.updateTransport(
      Number(id),
      body
    );

  return Response.json(
    transport
  );
}

export async function DELETE(
  _: Request,
  { params }: Params
) {
  const { id } =
    await params;

  await transportService.deleteTransport(
    Number(id)
  );

  return Response.json({
    success: true,
  });
}
