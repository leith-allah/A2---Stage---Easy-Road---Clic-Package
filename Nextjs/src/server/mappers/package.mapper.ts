
import { Package } from "@/server/entities/package.entity";
import { PackageDto } from "@/server/dto/package/package.dto";

export class PackageMapper {

  static toDto(
    entity: Package
  ): PackageDto {

    return {
      id: entity.id,
      name: entity.name,
      destination: entity.destination,
      price: entity.price,
    };
  }

}
