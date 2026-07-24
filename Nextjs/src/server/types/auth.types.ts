
export type UserRole =
  | "OWNER"
  | "SUPER_ADMIN"
  | "ADMIN"
  | "AGENCY"
  | "CLIENT";

export interface AuthUser {
  id: number;

  email: string;

  FIRSTName: string;

  lastName: string;

  role: UserRole;

  suspended: boolean;
}

export interface AuthJwtPayload {
  sub: number;
  email: string;
  role: UserRole;
}
