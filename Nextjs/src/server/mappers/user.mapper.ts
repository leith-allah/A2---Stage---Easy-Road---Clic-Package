
import { UserDto }
from "@/server/dto/user/user.dto";

export class UserMapper {

  static toDto(
    user: any
  ): UserDto {

    return {

      id:
        Number(
          user.id_user
        ),

      mle:
        user.mle_user,

      nin:
        user.nin_user,

      firstName:
        user.prenom_user,

      lastName:
        user.nom_user,

      birthDate:
        user.ddn_user,

      nationality:
        user.nat_user,

      status:
        user.statut_user,

      email:
        user.email_pro_user,

      createdAt:
        user.dcc_user,

      role:
        user.role?.nom_role ??
        "",

      roleId:
        user.id_role
          ? Number(user.id_role)
          : null,

      bureauId:
        user.id_bureau
          ? Number(
              user.id_bureau
            )
          : null,

    };

  }

}
