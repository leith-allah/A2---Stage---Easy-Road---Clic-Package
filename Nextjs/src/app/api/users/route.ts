
import {
  successResponse,
} from "@/server/api/responses/success";

import {
  validateBody,
} from "@/server/validations/validate-request";

import {
  createUserSchema,
} from "@/server/validations/user/create-user.validation";

import {
  userService,
} from "@/server/services/user.service";

export async function GET() {

  const users =
    await userService.getAllUsers();

  return successResponse(
    users
  );
}

export async function POST(
  request: Request
) {

  const data =
    await validateBody(
      request,
      createUserSchema
    );

  const user =
    await userService.createUser(
      data
    );

  return successResponse(
    user,
    201,
    "Utilisateur créé"
  );
}
