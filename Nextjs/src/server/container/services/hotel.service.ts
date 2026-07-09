
import { HotelService } from "@/server/services/hotel.service";

import { hotelRepository } from "../repositories/hotel.repository";

export const hotelService =
  new HotelService(
    hotelRepository
  );
  