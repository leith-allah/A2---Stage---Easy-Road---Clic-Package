
import { User } from "@/server/entities/user.entity";
import { UserDto } from "@/server/dto/user/user.dto";

export class UserMapper {

  static toDto(
    user: User
  ): UserDto {

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

}
