
export type Permission =

  // PACKAGES
  | "package:create"
  | "package:update"
  | "package:delete"

  // BOOKINGS
  | "booking:create"
  | "booking:update"
  | "booking:cancel"

  // USERS
  | "user:create"
  | "user:update"
  | "user:delete"

  // WALLET
  | "wallet:topup"
  | "wallet:transfer"

  // TRANSACTIONS
  | "transaction:view"

  // AGENCIES
  | "agency:view"
  | "agency:create"
  | "agency:update"
  | "agency:delete"

  // AGENCIES OFFICES
  | "agency-office:view"
  | "agency-office:create"
  | "agency-office:update"
  | "agency-office:delete";
  