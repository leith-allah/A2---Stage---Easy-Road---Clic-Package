
export interface PackageFormData {

    id?: number;

    name: string;

    country: string;

    destination: string;

    image: string;

    description: string;

    departureDate: string;

    returnDate: string;

    basePrice: number;

    totalStock: number;

    availableSeats?: number;

    createdAt?: string;

    status?: string;

}
