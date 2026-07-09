
import { PackageAggregate }

from "@/server/aggregates/package.aggregate";

export interface PackageRepository {

  findAll(): Promise<PackageAggregate[]>;

  findById(

    id: number,

  ): Promise<PackageAggregate | null>;

  createAggregate(

    aggregate: PackageAggregate,

  ): Promise<PackageAggregate>;

  updateAggregate(

    aggregate: PackageAggregate,

  ): Promise<PackageAggregate>;

  delete(

    id: number,

  ): Promise<void>;

}
