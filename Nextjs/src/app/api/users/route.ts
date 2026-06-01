
import { NextResponse } from "next/server";

import { UserService }
  from "@/server/services/user.service";

const userService =
  new UserService();

export async function GET() {

  const users =
    await userService.getUsers();

  return NextResponse.json(
    users
  );
}
