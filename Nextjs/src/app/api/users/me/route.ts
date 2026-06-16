
import { successResponse }
from "@/server/api/responses/success";

import { getCurrentUser }
from "@/server/auth/current-user";

import { validateBody }
from "@/server/validations/validate-request";

import { updateMyProfileSchema }
from "@/server/validations/user/update-my-profile.validation";

import { userService }
from "@/server/services/user.service";


export async function GET() {

  const user =
    await getCurrentUser();

  return successResponse(
    user
  );

}

export async function PATCH(
  request: Request
) {

  const currentUser =
    await getCurrentUser();

  const data =
    await validateBody(
      request,
      updateMyProfileSchema
    );

  const user =
    await userService.updateMyProfile(
      currentUser.id,
      data
    );

  return successResponse(
    user
  );

}
