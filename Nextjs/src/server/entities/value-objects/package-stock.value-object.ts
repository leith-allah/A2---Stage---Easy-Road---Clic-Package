
export class PackageStock {

  constructor(

      private total: number,

      private available: number,

  ) {

      if (total < 0) {

          throw new Error(
              "Le stock total ne peut pas être négatif."
          );

      }

      if (available < 0) {

          throw new Error(
              "Le stock disponible ne peut pas être négatif."
          );

      }

      if (available > total) {

          throw new Error(
              "Le stock disponible ne peut pas dépasser le stock total."
          );

      }

  }

  reserve(quantity: number) {

    if (quantity <= 0)

      throw new Error(

        "Quantité invalide.",

      );

    if (this.available < quantity)

      throw new Error(

        "Stock insuffisant.",

      );

    this.available -= quantity;

  }

  release(quantity: number) {

    if (quantity <= 0)

      throw new Error(

        "Quantité invalide.",

      );

    this.available += quantity;

    if (

      this.available >

      this.total

    ) {

      this.available =

        this.total;

    }

  }

  increase(quantity: number) {

      if (quantity <= 0) {

          throw new Error(
              "La quantité doit être supérieure à 0."
          );

      }

      this.total += quantity;

      this.available += quantity;

  }

  decrease(quantity: number) {

      if (quantity <= 0) {

          throw new Error(
              "La quantité doit être supérieure à 0."
          );

      }

      if (quantity > this.total) {

          throw new Error(
              "Impossible de retirer plus que le stock total."
          );

      }

      this.total -= quantity;

      if (this.available > this.total) {

          this.available = this.total;

      }

  }

  getTotal() {

    return this.total;

  }

  getAvailable() {

    return this.available;

  }

}
