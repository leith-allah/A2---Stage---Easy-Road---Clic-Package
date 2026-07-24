
import { hashPassword } from "@/server/auth/password";

export async function getMockUser() {
  return {
    id: 1,

    email: "admin@easyroad.com",

    password: await hashPassword("Admin123!"),

    FIRSTName: "Admin",

    lastName: "EasyRoad",

    role: "ADMIN" as const,

    suspended: false,
  };
}
