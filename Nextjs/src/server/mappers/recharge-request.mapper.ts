
import { RechargeRequest }
from "@/server/entities/recharge-request.entity";

import { RechargeRequestDto }
from "@/server/dto/recharge-request/recharge-request.dto";

export class RechargeRequestMapper {

  static toDto(
    entity: RechargeRequest
  ): RechargeRequestDto {

    return {

      id:
        entity.id,

      amount:
        entity.amount,

      status:
        entity.status,

      comment:
        entity.comment,

      createdAt:
        entity.createdAt,

    };

  }

  static fromPrisma(
    request: any
  ): RechargeRequest {

    return {

      id:
        Number(
          request.id_demande_recharge
        ),

      userId:
        Number(
          request.id_user
        ),

      amount:
        Number(
          request.montant_demande_recharge
        ),

      status:
        request.statut_demande_recharge,

      comment:
        request.comment_demande_recharge,

      createdAt:
        request.date_heure_demande_recharge,

    };

  }

}
