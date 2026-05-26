
import { errorResponse } from "../api/responses/error";

export function asyncHandler(
  handler: (...args: any[]) => Promise<Response>
) {
  return async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error) {
      return errorResponse(error);
    }
  };
}
