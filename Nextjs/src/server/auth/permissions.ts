
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
  | "agency-office:delete" 

  // EXCURSIONS
  | "excursion:view"
  | "excursion:create"
  | "excursion:update"
  | "excursion:delete"

  // ROLES
  | "role:view"
  | "role:create"
  | "role:update"
  | "role:delete"

  // TRANSPORTS
  | "transport:view"
  | "transport:create"
  | "transport:update"
  | "transport:delete";



  export const permissions = {

  // EXCURSIONS

  "excursion:view": "Voir les excursions",
  "excursion:create": "Créer une excursion",
  "excursion:update": "Modifier une excursion",
  "excursion:delete": "Supprimer une excursion",

};
  