
import { NextResponse }
  from "next/server";

export function successResponse<T>(
  data: T,
  status = 200,
  message = "Success"
) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    {
      status,
    }
  );
}
