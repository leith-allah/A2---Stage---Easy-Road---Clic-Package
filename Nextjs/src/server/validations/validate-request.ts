
import { ZodSchema } from "zod";
import { ApiError } from "@/server/utils/api-error";
import { ERROR_CODES } from "@/server/constants/errors";

export async function validateBody<T>(
  req: Request,
  schema: ZodSchema<T>
): Promise<T> {
  const body = await req.json();

  const result = schema.safeParse(body);

  if (!result.success) {
    throw new ApiError(
      400,
      "Validation error",
      ERROR_CODES.VALIDATION_ERROR,
      result.error.flatten()
    );
  }

  return result.data;
}
