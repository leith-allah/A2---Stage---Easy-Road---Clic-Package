
import { userRepository }
from "@/server/repositories/user.repository";

import { NotFoundException } from "@/server/utils/api-error";

import { UserMapper } from "@/server/mappers/user.mapper";

import { Prisma } from "@prisma/client";

import { USER_STATUS } from "@/server/constants/user-status";

import { canManageRole } 
from "@/server/auth/role-hierarchy";

import { ForbiddenException } 
from "@/server/utils/api-error";


export const userService = {

  async validateRoleManagement(
    currentRole: string,
    targetUserId: number
  ) {

    const targetUser =
      await userRepository.findById(
        targetUserId
      );

    if (!targetUser) {

      throw new NotFoundException(
        "Utilisateur introuvable"
      );

    }

    const targetRole =
      targetUser.role.nom_role;

    if (
      !canManageRole(
        currentRole,
        targetRole
      )
    ) {

      throw new ForbiddenException(
        "Vous ne pouvez pas gérer cet utilisateur"
      );

    }

    return targetUser;

  },

  async getAllUsers() {

    const users =
      await userRepository.findAll();

    return users.map(
      UserMapper.toDto
    );

  },

  async getUserById(
    id: number
  ) {

    const user =
      await userRepository.findById(
        id
      );

    if (!user) {
      throw new NotFoundException(
        "Utilisateur introuvable"
      );
    }

    return UserMapper.toDto(
      user
    );
  },

  async createUser(data: Prisma.utilisateurCreateInput) {

    return userRepository.create(
      data
    );
  },

  async updateUser(
    id: number,
    data: Prisma.utilisateurUpdateInput
  ) {

    await this.getUserById(id);

    return userRepository.update(
      id,
      data
    );
  },

  async deleteUser(
    id: number
  ) {

    await this.getUserById(
      id
    );

    return userRepository.update(
      id,
      {
        statut_user:
          USER_STATUS.DELETED,
      }
    );

  },

  async activateUser(
  id: number
) {

  await this.getUserById(id);

  return userRepository.update(
    id,
    {
      statut_user:
        USER_STATUS.ACTIVE,
    }
  );

},

async suspendUser(
  id: number
) {

  await this.getUserById(id);

  return userRepository.update(
    id,
    {
      statut_user:
        USER_STATUS.SUSPENDED,
    }
  );

},

async assignOffice(
  id: number,
  officeId: number
) {

  await this.getUserById(id);

  return userRepository.update(
    id,
    {
      id_bureau:
        BigInt(officeId),
    }
  );

},

async updateMyProfile(
  userId: number,
  data: {

    firstName?: string;

    lastName?: string;

    nationality?: string;

    email?: string;

  }

) {

  return userRepository.update(
    userId,
    {

      prenom_user:
        data.firstName,

      nom_user:
        data.lastName,

      nat_user:
        data.nationality,

      email_pro_user:
        data.email,

    }
  );

},

async changePassword(
  userId: number,
  hashedPassword: string
) {

  return userRepository.update(
    userId,
    {
      mdp_user:
        hashedPassword,
    }
  );

},

};
