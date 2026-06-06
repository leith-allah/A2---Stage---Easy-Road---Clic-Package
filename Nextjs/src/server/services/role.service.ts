
import {
  roleRepository,
}
from "@/server/repositories/role.repository";

import {
  NotFoundException,
}
from "@/server/utils/api-error";

export const roleService = {

  async getAllRoles() {

    return roleRepository.findAll();

  },

  async getRoleById(
    id: number
  ) {

    const role =
      await roleRepository.findById(
        id
      );

    if (!role) {

      throw new NotFoundException(
        "Role introuvable"
      );

    }

    return role;

  },

  async createRole(
    name: string
  ) {

    return roleRepository.create(
      name
    );

  },

  async updateRole(
    id: number,
    name: string
  ) {

    await this.getRoleById(
      id
    );

    return roleRepository.update(
      id,
      name
    );

  },

  async deleteRole(
    id: number
  ) {

    await this.getRoleById(
      id
    );

    return roleRepository.delete(
      id
    );

  },

};
