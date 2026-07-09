
export class PackageStock {

  constructor(

    private total: number,

    private available: number,

  ) {}

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

    this.total += quantity;

    this.available += quantity;

  }

  decrease(quantity: number) {

    if (quantity > this.total)

      throw new Error(

        "Impossible.",

      );

    this.total -= quantity;

    if (

      this.available >

      this.total

    ) {

      this.available =

        this.total;

    }

  }

  getTotal() {

    return this.total;

  }

  getAvailable() {

    return this.available;

  }

}
