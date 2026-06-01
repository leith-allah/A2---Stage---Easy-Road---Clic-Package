
import { User } from "@/server/entities/user.entity";

export const users: User[] = [
  {
    id: 1,
    email: "admin@easyroad.com",
    password: "hashed-password",
    role: "ADMIN",
    suspended: false,
    createdAt: new Date(),
  },
  {
    id: 2,
    email: "client@easyroad.com",
    password: "hashed-password",
    role: "CLIENT",
    suspended: false,
    createdAt: new Date(),
  },
];
