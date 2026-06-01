
import {
  successResponse,
} from "@/server/api/responses/success";

import {
  validateBody,
} from "@/server/validations/validate-request";

import {
  updateUserSchema,
} from "@/server/validations/user/update-user.validation";

import {
  userService,
} from "@/server/services/user.service";

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

  const user =
    await userService.getUserById(
      Number(id)
    );

  return successResponse(
    user
  );
}

export async function PATCH(
  request: Request,
  { params }: Params
) {

  const { id } =
    await params;

  const data =
    await validateBody(
      request,
      updateUserSchema
    );

  const user =
    await userService.updateUser(
      Number(id),
      data
    );

  return successResponse(
    user
  );
}

export async function DELETE(
  _: Request,
  { params }: Params
) {

  const { id } =
    await params;

  await userService.deleteUser(
    Number(id)
  );

  return successResponse({
    deleted: true,
  });
}
