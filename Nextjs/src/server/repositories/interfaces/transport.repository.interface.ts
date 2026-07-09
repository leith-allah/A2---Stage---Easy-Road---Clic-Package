
import { Transport } from "@/server/entities/transport.entity";

export interface TransportRepository {

  findAll(): Promise<Transport[]>;

  findById(
    id: number,
  ): Promise<Transport | null>;

  createAggregate(
    transport: Transport,
  ): Promise<Transport>;

  updateAggregate(
    transport: Transport,
  ): Promise<Transport>;

  delete(
    id: number,
  ): Promise<void>;

}
