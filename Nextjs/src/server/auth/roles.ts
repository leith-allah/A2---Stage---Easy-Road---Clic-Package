
import { Permission }
from "@/server/auth/permissions";

import { UserRole }
from "@/server/types/auth.types";

export const ROLE_PERMISSIONS:
Record<UserRole, Permission[]> = {

  SUPER_ADMIN: [
    
    "package:view",
    "package:create",
    "package:update",
    "package:delete",

    "booking:view",
    "booking:create",
    "booking:update",
    "booking:delete",

    "user:create",
    "user:update",
    "user:delete",

    "wallet:view",
    "wallet:balance",
    "wallet:create",
    "wallet:delete",
    "wallet:topup",
    "wallet:transfer",

    "transaction:view",
    "transaction:create",
    "transaction:update",
    "transaction:delete",

    "agency:view",
    "agency:create",
    "agency:update",
    "agency:delete",

  ],


  ADMIN: [

    "package:view",
    "package:create",
    "package:update",
    "package:delete",

    "booking:view",
    "booking:create",
    "booking:update",
    "booking:delete",

    "user:create",
    "user:update",
    "user:delete",

    "wallet:view",
    "wallet:balance",
    "wallet:create",
    "wallet:delete",
    "wallet:topup",
    "wallet:transfer",

    "transaction:view",
    "transaction:create",
    "transaction:update",
    "transaction:delete",

    "agency:view",
    "agency:create",
    "agency:update",
    "agency:delete",

  ],

  AGENCY: [

    "package:view",

    "booking:view",
    "booking:create",
    "booking:update",
    "booking:delete",

    "wallet:view",
    "wallet:balance",
    "wallet:topup",
    "wallet:transfer",

    "transaction:view",
    "transaction:create",
    "transaction:update",
    "transaction:delete",

    "agency:view",
  ],

  CLIENT: [

    "package:view",

    "booking:view",
    "booking:create",

    "wallet:view",
    "wallet:balance",
    "wallet:topup",

    "transaction:view",
    "transaction:create",
    "transaction:update",
    "transaction:delete",
  ],
};
