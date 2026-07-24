
import { Flight } from "@/server/entities/flight.entity";
import { Hotel } from "@/server/entities/hotel.entity";
import { Transport } from "@/server/entities/transport.entity";
import { Excursion } from "@/server/entities/excursion.entity";

import { 
  Supplements, 
  FlightClass,
  RoomType,
  BoardType,
} from "../entities/value-objects/supplements.value-object";

import {
  PackageStatus,
  PackageStatusValue,
} from "../entities/value-objects/package-status.value-object";

import { PackageStock } from "../entities/value-objects/package-stock.value-object";


export class PackageAggregate {

  constructor(

    public readonly id: number,

    public name: string,

    public country: string,

    public destination: string,

    public image: string | null,

    public description: string | null,

    public departureDate: Date,

    public returnDate: Date,

    public basePrice: number,

    public readonly stock: PackageStock,

    public readonly status: PackageStatus,

    public supplements: Supplements,

    public defaultFlightClass: FlightClass,

    public defaultRoomType: RoomType,

    public defaultBoardType: BoardType,

    public readonly ownerId: number,

    public flights: Flight[],

    public hotels: Hotel[],

    public transports: Transport[],

    public excursions: Excursion[],

  ) {

    this.validateName();

    this.validateCountry();

    this.validateDestination();

    this.validateDates();

    this.validateBasePrice();

    this.validateImage();

    this.validateDescription();

  }

  // =======================================
  // Métier
  // =======================================

  publish() {

    this.status.publish();

  }

  archive() {

    this.status.archive();

  }

  disable() {

      this.status.disable(); // ou disable() selon ton choix

  }

  draft() {

    this.status.draft();

  }

  isPublished() {

    return this.status.isPublished();

  }

  isArchived() {

    return this.status.isArchived();

  }

  reserveSeats(

    quantity: number,

  ) {

    this.stock.reserve(quantity);

  }

  releaseSeats(

    quantity: number,

  ) {

    this.stock.release(quantity);

  }

  increaseStock(

    quantity: number,

  ) {

    this.stock.increase(quantity);

  }

  decreaseStock(

    quantity: number,

  ) {

    this.stock.decrease(quantity);

  }

  calculatePrice(options: {

      flightClass?: FlightClass;

      roomType?: RoomType;

      boardType?: BoardType;

  }) {

      let total = this.basePrice;

      if(options.flightClass) {

          total +=
              this.supplements.getFlightSupplement(options.flightClass)
            - this.supplements.getFlightSupplement(this.defaultFlightClass);

      }

      if(options.roomType) {

          total +=
              this.supplements.getRoomSupplement(options.roomType)
            - this.supplements.getRoomSupplement(this.defaultRoomType);

      }

      if(options.boardType) {

          total +=
              this.supplements.getBoardSupplement(options.boardType)
            - this.supplements.getBoardSupplement(this.defaultBoardType);

      }

      return total;

  }

  getAvailableStock() {

    return this.stock.getAvailable();

  }

  getTotalStock() {

    return this.stock.getTotal();

  }

  getStatus() {

    return this.status.getValue();

  }

  private validateBasePrice() {

      if (this.basePrice < 0) {

          throw new Error(
              "Le prix de base ne peut pas être négatif."
          );

      }

  }

  private validateDates() {

      if (this.returnDate <= this.departureDate) {

          throw new Error(
              "La date de retour doit être après la date de départ"
          );

      }

  }

  private validateImage() {

      if (

          this.image &&

          this.image.trim() === ""

      ) {

          throw new Error(
              "L'image ne peut pas être vide."
          );

      }

  }

  private validateName() {

      if (

          this.name.trim().length < 3

      ) {

          throw new Error(
              "Le nom du package doit contenir au moins 3 caractères."
          );

      }

  }

  private validateCountry() {

      if (

          this.country.trim().length === 0

      ) {

          throw new Error(
              "Le pays est obligatoire."
          );

      }

  }

  private validateDestination() {

      if (

          this.destination.trim().length === 0

      ) {

          throw new Error(
              "La destination est obligatoire."
          );

      }

  }

  private validateDescription() {

      if (

          this.description &&

          this.description.length > 2000

      ) {

          throw new Error(
              "La description est trop longue."
          );

      }

  }

  updateInformations({
      name,
      country,
      destination,
      image,
      description,
      departureDate,
      returnDate,
      basePrice,
      supplements,
      defaultFlightClass,
      defaultRoomType,
      defaultBoardType,
  }: {
      name?: string;
      country?: string;
      destination?: string;
      image?: string | null;
      description?: string | null;
      departureDate?: Date;
      returnDate?: Date;
      basePrice?: number;
      supplements?: Supplements;
      defaultFlightClass?: FlightClass;
      defaultRoomType?: RoomType;
      defaultBoardType?: BoardType;
  }): void {

      if (name !== undefined)
          this.name = name;

      if (country !== undefined)
          this.country = country;

      if (destination !== undefined)
          this.destination = destination;

      if (image !== undefined)
          this.image = image;

      if (description !== undefined)
          this.description = description;

      if (departureDate !== undefined)
          this.departureDate = departureDate;

      if (returnDate !== undefined)
          this.returnDate = returnDate;

      if (basePrice !== undefined)
          this.basePrice = basePrice;

      if (supplements !== undefined)
          this.supplements = supplements;

      if (defaultFlightClass !== undefined)
          this.defaultFlightClass = defaultFlightClass;

      if (defaultRoomType !== undefined)
          this.defaultRoomType = defaultRoomType;

      if (defaultBoardType !== undefined)
          this.defaultBoardType = defaultBoardType;

      this.validateName();
      this.validateCountry();
      this.validateDestination();
      this.validateDates();
      this.validateBasePrice();
      this.validateImage();
      this.validateDescription();
  }

}
