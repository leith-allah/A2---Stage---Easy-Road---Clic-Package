
import { ZodSchema } from "zod";

export async function validateBody<T>(
  request: Request,
  schema: ZodSchema<T>
): Promise<T> {

  const body =
    await request.json();

  return schema.parse(
    body
  );

}
