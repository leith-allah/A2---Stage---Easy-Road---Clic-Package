
import { asyncHandler } from "@/server/utils/async-handler";
import { successResponse } from "@/server/api/responses/success";

import { validateBody } from "@/server/validations/validate-request";
import { loginSchema } from "@/server/validations/auth/login.validation";

export const POST = asyncHandler(async (req: Request) => {
  const body = await validateBody(req, loginSchema);

  return successResponse(
    {
      received: body,
    },
    "Validation successful"
  );
});
