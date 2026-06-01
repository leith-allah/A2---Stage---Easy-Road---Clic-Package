
import { NextResponse }
  from "next/server";

import { UserService }
  from "@/server/services/user.service";

const userService =
  new UserService();

export async function GET(
  request: Request,

  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  try {

    const { id } =
      await params;

    const user =
      await userService.getUserById(
        Number(id)
      );

    return NextResponse.json(
      user
    );

  } catch (error) {

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 404,
      }
    );
  }
}
