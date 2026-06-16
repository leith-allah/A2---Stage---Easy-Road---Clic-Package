
import { successResponse }
from "@/server/api/responses/success";

import { validateBody }
from "@/server/validations/validate-request";

import { changePasswordSchema }
from "@/server/validations/user/change-password.validation";

import { getCurrentUser }
from "@/server/auth/current-user";

import { userRepository }
from "@/server/repositories/user.repository";

import {
  comparePassword,
  hashPassword,
}
from "@/server/auth/password";

import { userService }
from "@/server/services/user.service";


export async function PATCH(
  request: Request
) {

  const currentUser =
    await getCurrentUser();

  const data =
    await validateBody(
      request,
      changePasswordSchema
    );

  const user =
    await userRepository.findById(
      currentUser.id
    );

  if (!user) {

    throw new Error(
      "Utilisateur introuvable"
    );

  }

  const validPassword =
    await comparePassword(
      data.currentPassword,
      user.mdp_user
    );

  if (!validPassword) {

    throw new Error(
      "Mot de passe actuel incorrect"
    );

  }

  const hashedPassword =
    await hashPassword(
      data.newPassword
    );

  await userService.changePassword(
    currentUser.id,
    hashedPassword
  );

  return successResponse({
    updated: true,
  });

}
