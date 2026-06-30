
import { favoriteRepository } from "@/server/repositories/favorite.repository";
import { getCurrentUserId } from "@/server/auth/session";
import { PackageMapper } from "@/server/mappers/package.mapper";

export const favoriteService = {

  async getMyFavorites() {

    const userId = await getCurrentUserId();

    const favorites =
      await favoriteRepository.findByUser(userId);

    return favorites.map((favorite) =>

      PackageMapper.toDto(

        PackageMapper.fromPrisma(

          favorite.package_voyage

        )

      )

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
