
import { favoriteRepository } from "@/server/repositories/favorite.repository";
import { getCurrentUserId } from "@/server/auth/session";
import { PackageMapper } from "@/server/mappers/package.mapper";

import { PrismaPackageRepository }
from "@/server/repositories/prisma/prisma-package.repository";

const packageRepository =
    new PrismaPackageRepository();

export const favoriteService = {

  async getMyFavorites() {

    const userId =
        await getCurrentUserId();

    const favorites =
        await favoriteRepository.findByUser(userId);

    const packages = await Promise.all(

        favorites.map(favorite =>

            packageRepository.findById(

                Number(favorite.id_pack)

            )

        )

    );

    return packages

        .filter(

            (pkg): pkg is NonNullable<typeof pkg> =>
                pkg !== null

        )

        .map(pkg =>

            PackageMapper.toDto(pkg)

        );

  },

  async add(packageId: number) {

    const userId = await getCurrentUserId();

    const exists =
      await favoriteRepository.find(userId, packageId);

    if (exists) {

      return {
        success: true,
      };

    }

    await favoriteRepository.create(userId, packageId);

    return {
      success: true,
    };

  },

  async remove(packageId: number) {

    const userId = await getCurrentUserId();

    const favorite =
      await favoriteRepository.find(userId, packageId);

    if (!favorite) {

      return {
        success: true,
      };

    }

    await favoriteRepository.delete(
      userId,
      packageId
    );

    return {
      success: true,
    };

  },

};
