
import { PackageAggregate } from "@/server/aggregates/package.aggregate";

export interface PackageRepository {

    findAll(): Promise<PackageAggregate[]>;

    findArchived(): Promise<PackageAggregate[]>;

    findFiltered(filters: {
        country?: string;
        destination?: string;
        status?: string;
    }): Promise<PackageAggregate[]>;

    findById(
        id: number,
    ): Promise<PackageAggregate | null>;

    findByIdIncludingArchived(
        id: number,
    ): Promise<PackageAggregate | null>;

    createAggregate(
        aggregate: PackageAggregate,
    ): Promise<PackageAggregate>;

    updateAggregate(
        aggregate: PackageAggregate,
    ): Promise<PackageAggregate>;

    archive(
        id: number,
    ): Promise<void>;

    restore(
        id: number,
    ): Promise<void>;

}
