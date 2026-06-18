
export type Permission =

  // PACKAGES
  | "package:view"
  | "package:create"
  | "package:update"
  | "package:delete"

  // BOOKINGS
  | "booking:view"
  | "booking:create"
  | "booking:update"
  | "booking:delete"

  // USERS
  | "user:view"
  | "user:create"
  | "user:update"
  | "user:delete"
  | "user:activate"
  | "user:suspend"
  | "user:assign-office"

  // WALLET
  | "wallet:topup"
  | "wallet:transfer"
  | "wallet:balance"
  | "wallet:view"
  | "wallet:create"
  | "wallet:delete"

  // TRANSACTIONS
  | "transaction:view"
  | "transaction:create"
  | "transaction:update"
  | "transaction:delete"

  // RECHARGE REQUESTS
  | "recharge-request:view"
  | "recharge-request:create"
  | "recharge-request:approve"
  | "recharge-request:reject"

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
  | "transport:delete"

  // HOTELS
  | "hotel:view"
  | "hotel:create"
  | "hotel:update"
  | "hotel:delete";



  export const permissions = {

  // EXCURSIONS
  "excursion:view": "Voir les excursions",
  "excursion:create": "Créer une excursion",
  "excursion:update": "Modifier une excursion",
  "excursion:delete": "Supprimer une excursion",


  // PACKAGES
  "package:view": "Voir les packages",
  "package:create": "Créer un package",
  "package:update": "Modifier un package",
  "package:delete": "Supprimer un package",


  // HOTELS
  "hotel:view": "Voir les hôtels",
  "hotel:create": "Créer un hôtel",
  "hotel:update": "Modifier un hôtel",
  "hotel:delete": "Supprimer un hôtel",


  // BOOKINGS
  "booking:view": "Voir les réservations",
  "booking:create": "Créer une réservation",
  "booking:update": "Modifier une réservation",
  "booking:delete": "Supprimer une réservation",

  
  // RECHARGE REQUESTS
  "recharge-request:view": "Voir les demandes de rechargement",
  "recharge-request:create": "Créer une demande de rechargement",
  "recharge-request:approve": "Approuver une demande de rechargement",
  "recharge-request:reject": "Refuser une demande de rechargement",

};
  