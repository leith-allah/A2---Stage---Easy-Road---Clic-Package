
import { bookingRepository }
from "@/server/repositories/booking.repository";

import { BookingMapper }
from "@/server/mappers/booking.mapper";

import { CreateBookingDto }
from "@/server/dto/booking/create-booking.dto";

import { UpdateBookingDto }
from "@/server/dto/booking/update-booking.dto";

import { NotFoundException }
from "@/server/exceptions/not-found.exception";

export const bookingService = {

  async getBookings() {

    const bookings =
      await bookingRepository.findAll();

    return bookings.map(
      (booking) =>
        BookingMapper.toDto(
          BookingMapper.fromPrisma(
            booking
          )
        )
    );
  },

  async getBookingById(
    id: number
  ) {

    const booking =
      await bookingRepository.findById(
        id
      );

    if (!booking) {

      throw new NotFoundException(
        "Réservation introuvable"
      );
    }

    return BookingMapper.toDto(
      BookingMapper.fromPrisma(
        booking
      )
    );
  },


  async bookingExists(
  id: number
) {

  const booking =
    await bookingRepository.findById(
      id
    );

  if (!booking) {

    throw new NotFoundException(
      "Réservation introuvable"
    );

  }

  return booking;

},


  async createBooking(
    dto: CreateBookingDto
  ) {

    return bookingRepository.create({

      ref_achat_pack:
        crypto.randomUUID(),

      nb_voyageurs:
        dto.travelers,

      classe_vol_achat_pack:
        dto.flightClass,

      type_chambre_achat_pack:
        dto.roomType,

      pension_achat_pack:
        dto.pension,

      prix_achat_pack:
        dto.purchasePrice,

      remise_achat_pack:
        dto.discount,

      total_achat_pack:
        dto.totalPrice,

      date_heure_achat_pack:
        new Date(),

      statut_achat_pack:
        "EN_ATTENTE",

      id_pack:
        BigInt(dto.packageId),

      id_user:
        BigInt(dto.userId),
    });
  },

  async updateBooking(
    id: number,
    dto: UpdateBookingDto
  ) {

    await this.bookingExists(id);

    return bookingRepository.update(
      id,
      {
        statut_achat_pack:
          dto.status,
      }
    );
  },


  async deleteBooking(
    id: number
  ) {

    await this.bookingExists(
      id
    );

    await bookingRepository.delete(
      id
    );

    return {
      success: true,
    };

  },
};
