
import { UserRepository }
from "@/server/repositories/user.repository";

import { UserMapper }
from "@/server/mappers/user.mapper";

import { NotFoundException }
from "@/server/exceptions/not-found.exception";

export class UserService {

  private repository =
    new UserRepository();

  async getUserById(
    id: number
  ) {

    const user =
      await this.repository.findById(id);

    if (!user) {
      throw new NotFoundException(
        "User not found"
      );
    }

    return UserMapper.toDto(user);
  }

  async getUsers() {

    const users =
      await this.repository.findAll();

    return users.map(
      UserMapper.toDto
    );
  }

}
