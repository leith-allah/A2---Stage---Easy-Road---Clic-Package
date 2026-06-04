
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
  | "transaction:view";
  