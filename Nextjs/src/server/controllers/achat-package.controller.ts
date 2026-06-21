
import { achatPackageService }
from "@/server/services/achat-package.service";

import { CreateAchatPackageDto }
from "@/server/dto/achat-package/create-achat-package.dto";


export const achatPackageController = {

  async createPurchase(
    dto: CreateAchatPackageDto
  ) {

    return achatPackageService.createPurchase(
      dto
    );
  },

  async getMyPurchases() {
    return achatPackageService.getMyPurchases();
  },

  async getPurchaseById(
    id: number
  ) {

    return achatPackageService.getPurchaseById(
      id
    );
  },

  async getAllPurchases() {
    return achatPackageService.getAllPurchases();
  },

  async cancelPurchase(
    id: number
  ) {

    return achatPackageService.cancelPurchase(
      id
    );

  },

};
