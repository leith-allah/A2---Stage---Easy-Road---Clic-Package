
import { userRepository }
  from "@/server/repositories/user.repository";

import {
  NotFoundException,
} from "@/server/utils/api-error";

export const userService = {

  async getAllUsers() {

    return userRepository.findAll();
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

    return user;
  },

  async createUser(
    data: any
  ) {

    return userRepository.create(
      data
    );
  },

  async updateUser(
    id: number,
    data: any
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

    await this.getUserById(id);

    return userRepository.delete(
      id
    );
  },
};
