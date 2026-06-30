
import { ROLES } from "./roles";

export function isOwner(role: string) {
  return role === ROLES.OWNER;
}

export function isSuperAdmin(role: string) {
  return role === ROLES.SUPER_ADMIN;
}

export function isAdmin(role: string) {
  return (
    role === ROLES.ADMIN ||
    role === ROLES.SUPER_ADMIN ||
    role === ROLES.OWNER
  );
}

export function isAgency(role: string) {
  return role === ROLES.AGENCY;
}

export function isClient(role: string) {
  return role === ROLES.CLIENT;
}
