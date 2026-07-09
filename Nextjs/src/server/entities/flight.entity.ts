
export class Flight {

  constructor(
    public readonly id: number,
    public airline: string,
    public departureLocation: string,
    public destination: string,
    public departureDate: Date,
    public departureTime: Date,
    public arrivalTime: Date,
    public returnDate: Date | null,
    public returnDepartureTime: Date | null,
    public returnArrivalTime: Date | null,
    public flightNumber: string,
  ) {}

  isRoundTrip(): boolean {
    return this.returnDate !== null;
  }

  getDurationMinutes(): number {

    const diff =
      this.arrivalTime.getTime()
      - this.departureTime.getTime();

    return Math.floor(diff / 60000);

  }

}
