
import { City } from "@/server/entities/city.entity";

export interface CityRepository {

  findAll(): Promise<City[]>;

  findById(
    id: number,
  ): Promise<City | null>;

}
