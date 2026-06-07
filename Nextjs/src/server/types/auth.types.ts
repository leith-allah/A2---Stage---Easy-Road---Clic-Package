
export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "AGENCY"
  | "CLIENT";

export interface AuthUser {
  id: number;

  email: string;

  firstName: string;

  lastName: string;

  role: UserRole;

  suspended: boolean;
}

export interface AuthJwtPayload {
  sub: number;
  email: string;
  role: UserRole;
}
