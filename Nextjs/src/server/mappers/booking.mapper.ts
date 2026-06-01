
import { Booking } from "@/server/entities/booking.entity";
import { BookingDto } from "@/server/dto/booking/booking.dto";

export class BookingMapper {

  static toDto(
    entity: Booking
  ): BookingDto {

    return {
      id: entity.id,
      packageId: entity.packageId,
      travelers: entity.travelers,
      totalPrice: entity.totalPrice,
      status: entity.status,
    };
  }

}
