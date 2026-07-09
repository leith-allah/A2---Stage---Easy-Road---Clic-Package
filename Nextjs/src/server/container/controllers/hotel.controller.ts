
import { HotelController } from "@/server/controllers/hotel.controller";

import { hotelService } from "../services/hotel.service";

export const hotelController =
  new HotelController(
    hotelService
  );
  