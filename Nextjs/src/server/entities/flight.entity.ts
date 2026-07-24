
import { Airline } from "./airline.entity";
import { Airport } from "./airport.entity";

import { FlightStatus } from "./value-objects/flight-status.value-object";

export class Flight {

  constructor(

    private readonly id: number,

    private status: FlightStatus,

    private flightNumber: string,

    private departureDateTime: Date,

    private arrivalDateTime: Date,

    private departureAirport: Airport,

    private arrivalAirport: Airport,

    private airline: Airline,

  ) {

    this.validateDates();

  }

  // =======================================
  // Métier
  // =======================================

  activate() {
    this.status.activate();
  }

  inactivate() {
    this.status.inactivate();
  }

  archive() {
    this.status.archive();
  }

  isActive() {
    return this.status.isActive();
  }

  isInactive() {
    return this.status.isInactive();
  }

  isArchived() {
    return this.status.isArchived();
  }

  changeDepartureDate(date: Date) {

    this.departureDateTime = date;

    this.validateDates();

  }

  changeArrivalDate(date: Date) {

    this.arrivalDateTime = date;

    this.validateDates();

  }

  changeDepartureAirport(airport: Airport) {

    this.departureAirport = airport;

  }

  changeArrivalAirport(airport: Airport) {

    this.arrivalAirport = airport;

  }

  changeAirline(airline: Airline) {

    this.airline = airline;

  }

  changeFlightNumber(number: string) {

    this.flightNumber = number;

  }

  // =======================================
  // Validation
  // =======================================

  private validateDates() {

    if (this.arrivalDateTime <= this.departureDateTime) {

      throw new Error(
        "La date d'arrivée doit être postérieure à la date de départ.",
      );

    }

  }

  // =======================================
  // Utilitaires
  // =======================================

  getDurationMinutes(): number {

    return Math.floor(

      (
        this.arrivalDateTime.getTime() -
        this.departureDateTime.getTime()
      ) / 60000,

    );

  }

  // =======================================
  // Getters
  // =======================================

  getId(): number {
    return this.id;
  }

  getStatus(): FlightStatus {
    return this.status;
  }

  getFlightNumber(): string {
    return this.flightNumber;
  }

  getDepartureDateTime(): Date {
    return this.departureDateTime;
  }

  getArrivalDateTime(): Date {
    return this.arrivalDateTime;
  }

  getDepartureAirport(): Airport {
    return this.departureAirport;
  }

  getArrivalAirport(): Airport {
    return this.arrivalAirport;
  }

  getAirline(): Airline {
    return this.airline;
  }

}
