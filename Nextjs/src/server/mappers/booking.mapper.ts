
import { Booking } from "@/server/entities/booking.entity";
import { BookingDto } from "@/server/dto/booking/booking.dto";

export class BookingMapper {

  static toDto(
    entity: Booking
  ): BookingDto {

    return {
      id: entity.id,
      reference: entity.reference,
      travelers: entity.travelers,
      flightClass: entity.flightClass,
      roomType: entity.roomType,
      pension: entity.pension,
      totalPrice: entity.totalPrice,
      status: entity.status,
      packageId: entity.packageId,
      userId: entity.userId,
    };
  }

  static fromPrisma(
    booking: any
  ): Booking {

    return {
      id: Number(
        booking.id_achat_pack
      ),

      reference:
        booking.ref_achat_pack,

      travelers:
        booking.nb_voyageurs,

      flightClass:
        booking.classe_vol_achat_pack,

      roomType:
        booking.type_chambre_achat_pack,

      pension:
        booking.pension_achat_pack,

      purchasePrice:
        Number(
          booking.prix_achat_pack
        ),

      discount:
        Number(
          booking.remise_achat_pack ?? 0
        ),

      totalPrice:
        Number(
          booking.total_achat_pack
        ),

      bookingDate:
        booking.date_heure_achat_pack,

      status:
        booking.statut_achat_pack,

      packageId:
        Number(
          booking.id_pack
        ),

      userId:
        Number(
          booking.id_user
        ),
    };
  }
}
