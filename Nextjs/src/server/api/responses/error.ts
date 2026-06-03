
import { NextResponse } from "next/server";
import { ApiError } from "@/server/utils/api-error";

export function errorResponse(error: unknown) {
  console.error(error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        error: {
          code: error.code,
          details: error.details ?? null,
        },
      },
      {
        status: error.statusCode,
      }
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: "Internal server error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
      },
    },
    {
      status: 500,
    }
  );
}
