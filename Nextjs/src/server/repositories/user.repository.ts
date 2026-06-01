
import { BaseRepository } from "@/server/repositories/base.repository";

import { User } from "@/server/entities/user.entity";

import { users } from "@/server/mock-data/users";

export class UserRepository
  extends BaseRepository<User> {

  async findById(
    id: number
  ): Promise<User | null> {

    return (
      users.find(
        user => user.id === id
      ) || null
    );
  }

  async findAll(): Promise<User[]> {
    return users;
  }

  async create(
    data: Partial<User>
  ): Promise<User> {

    const user: User = {
      id: users.length + 1,
      email: data.email || "",
      password: data.password || "",
      role: data.role || "CLIENT",
      suspended: false,
      createdAt: new Date(),
    };

    users.push(user);

    return user;
  }

  async update(
    id: number,
    data: Partial<User>
  ): Promise<User> {

    const user =
      await this.findById(id);

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    Object.assign(
      user,
      data
    );

    return user;
  }

  async delete(
    id: number
  ): Promise<void> {

    const index =
      users.findIndex(
        user => user.id === id
      );

    if (index >= 0) {
      users.splice(index, 1);
    }
  }
}
