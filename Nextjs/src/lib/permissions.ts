
import { ROLES } from "./roles";

export function isAdmin(role: string) {
  return role === ROLES.ADMIN;
}

export function isClient(role: string) {
  return role === ROLES.CLIENT;
}
