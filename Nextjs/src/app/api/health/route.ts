
import { successResponse } from "@/server/api/responses/success";
import { asyncHandler } from "@/server/utils/async-handler";

export const GET = asyncHandler(async () => {
  return successResponse(
    {
      status: "OK",
      timestamp: new Date().toISOString(),
    },
    200,
    "Validation successful"
  );
});
