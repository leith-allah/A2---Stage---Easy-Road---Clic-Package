
import { Hotel } from "@/server/entities/hotel.entity";

export interface HotelRepository {

  findAll(): Promise<Hotel[]>;

  findById(
    id: number,
  ): Promise<Hotel | null>;

  createAggregate(
    hotel: Hotel,
  ): Promise<Hotel>;

  updateAggregate(
    hotel: Hotel,
  ): Promise<Hotel>;

  delete(
    id: number,
  ): Promise<void>;

}
