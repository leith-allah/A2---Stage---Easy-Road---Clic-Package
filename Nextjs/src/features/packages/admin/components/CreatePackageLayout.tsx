
"use client";

import { useState } from "react";

import PackageBasicInfoForm from "./PackageBasicInfoForm";
import HotelSelector from "./HotelSelector";
import FlightSelector from "./FlightSelector";
import TransportSelector from "./TransportSelector";
import ExcursionSelector from "./ExcursionSelector";
import PricingForm from "./PricingForm";
import PackagePreview from "./PackagePreview";

export default function CreatePackageLayout() {

  // PACKAGE
  const [packageData, setPackageData] = useState({
    title: "",
    country: "",
    city: "",
    description: "",
    departureDate: "",
    returnDate: "",
    image: "",
  });

  // HOTEL
  const [hotelData, setHotelData] = useState({
    existingHotel: "",
    hotelName: "",
    hotelAddress: "",
    stars: "",
  });

  // FLIGHT
  const [flightData, setFlightData] = useState({
    existingFlight: "",
    airline: "",
    departureAirport: "",
    flightNumber: "",
  });

  // TRANSPORT
  const [transportData, setTransportData] = useState({
    existingTransport: "",
    company: "",
    route: "",
  });

  // EXCURSION
  const [excursionData, setExcursionData] = useState({
    existingExcursion: "",
    name: "",
    location: "",
    description: "",
  });

  // PRICING
  const [pricingData, setPricingData] = useState({
    basePrice: "",
    stock: "",
  });

  return (
    <section className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-[1800px] mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-blue-600">
            Création Package
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            Créez un nouveau package voyage.
          </p>
        </div>

        {/* LAYOUT */}
        <div className="grid xl:grid-cols-[1fr_420px] gap-8 items-start">

          {/* LEFT */}
          <div className="space-y-8">

            <PackageBasicInfoForm
              packageData={packageData}
              setPackageData={setPackageData}
            />

          </div>

          {/* RIGHT */}
          <div className="sticky top-8">
            <PackagePreview
              packageData={packageData}
              hotelData={hotelData}
              flightData={flightData}
              transportData={transportData}
              excursionData={excursionData}
              pricingData={pricingData}
            />
          </div>
        </div>


        {/* Down */}
        <div className="grid xl:grid-cols-2 gap-8 mt-8 items-start">

          {/* LEFT COLUMN */}
          <div className="space-y-8">

            <HotelSelector
              hotelData={hotelData}
              setHotelData={setHotelData}
            />

            <PricingForm
              pricingData={pricingData}
              setPricingData={setPricingData}
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">

            <FlightSelector
              flightData={flightData}
              setFlightData={setFlightData}
            />

            <TransportSelector
              transportData={transportData}
              setTransportData={setTransportData}
            />

            <ExcursionSelector
              excursionData={excursionData}
              setExcursionData={setExcursionData}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
