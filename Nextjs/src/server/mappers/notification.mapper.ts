
import { Notification }
from "@/server/entities/notification.entity";

import { NotificationDto }
from "@/server/dto/notification/notification.dto";

export class NotificationMapper {

  static fromPrisma(
    notification: any
  ): Notification {

    return {

      id:
        Number(
          notification.id_demande_recharge
        ),

      userId:
        Number(
          notification.id_user
        ),

      status:
        notification.statut_demande_recharge,

      amount:
        Number(
          notification.montant_demande_recharge
        ),

      comment:
        notification.commentaire_demande_recharge,

      createdAt:
        notification.date_heure_demande_recharge,
    };
  }

  static toDto(
    entity: Notification
  ): NotificationDto {

    return {

      id:
        entity.id,

      userId:
        entity.userId,

      status:
        entity.status,

      amount:
        entity.amount,

      comment:
        entity.comment,

      createdAt:
        entity.createdAt.toISOString(),
    };
  }

}
