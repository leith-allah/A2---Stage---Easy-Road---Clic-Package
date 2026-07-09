
import { Excursion } from "@/server/entities/excursion.entity";

export interface ExcursionRepository {

  findAll(): Promise<Excursion[]>;

  findById(
    id: number,
  ): Promise<Excursion | null>;

  createAggregate(
    excursion: Excursion,
  ): Promise<Excursion>;

  updateAggregate(
    excursion: Excursion,
  ): Promise<Excursion>;

  delete(
    id: number,
  ): Promise<void>;

}
