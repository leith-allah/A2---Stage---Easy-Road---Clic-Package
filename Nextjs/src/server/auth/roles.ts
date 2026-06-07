
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

    "wallet:topup",
    "wallet:transfer",

    "transaction:view",

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

    "wallet:topup",
    "wallet:transfer",

    "transaction:view",

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

    "wallet:topup",
    "wallet:transfer",

    "transaction:view",

    "agency:view",
  ],

  CLIENT: [

    "package:view",

    "booking:view",
    "booking:create",

    "wallet:topup",

    "transaction:view",
  ],
};
