
import { cookies }
from "next/headers";

import { verifyToken }
from "@/server/auth/jwt";

import { userRepository }
from "@/server/repositories/user.repository";

import { UnauthorizedException }
from "@/server/utils/api-error";

import { UserMapper }
from "@/server/mappers/user.mapper";

import { USER_STATUS }
from "@/server/constants/user-status";


export async function getCurrentUser() {

  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      "easyroad_access_token"
    )?.value;

  if (!token) {

    throw new UnauthorizedException(
      "Non authentifié"
    );

  }

  const payload =
    verifyToken(
      token
    );

  const user =
    await userRepository.findById(
      Number(payload.sub)
    );

  if (!user) {

    throw new UnauthorizedException(
      "Utilisateur introuvable"
    );

  }

  if (
    user.statut_user ===
    USER_STATUS.SUSPENDED
  ) {

    throw new UnauthorizedException(
        "Compte suspendu"
    );

  }

  if (
    user.statut_user ===
    USER_STATUS.DELETED
  ) {

    throw new UnauthorizedException(
      "Compte supprimé"
    );

  }

  if (
    user.statut_user ===
    USER_STATUS.PENDING
  ) {

    throw new UnauthorizedException(
      "Compte en attente"
    );

  }

  return UserMapper.toDto(
    user
  );

}
