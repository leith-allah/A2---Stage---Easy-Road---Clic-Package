
"use client";

import {useState} from "react";

import PackageStepper from "./PackageStepper";

import StepPackage from "./steps/StepPackage";
import StepFlight from "./steps/StepFlight";
import StepHotel from "./steps/StepHotel";
import StepTransport from "./steps/StepTransport";
import StepExcursion from "./steps/StepExcursion";
import StepReview from "./steps/StepReview";


interface PackageData {

    name:string;

    country:string;

    destination:string;

    departureDate:string;

    returnDate:string;

    description?:string;

    basePrice:number;

}

interface FlightData {

    airline:string;

    departureLocation:string;

    destination:string;

    departureDate:string;

    departureTime:string;

    arrivalTime:string;

    returnDate:string;

    returnDepartureTime:string;

    returnArrivalTime:string;

    flightNumber:string;

}

interface HotelData {

    name:string;

    stars:number;

    country:string;

    city:string;

    address:string;

}

interface TransportData {

    route:string;

    company:string;

}

interface ExcursionData {

    name:string;

    location:string;

    description:string;

}

interface WizardData {

    package:PackageData;

    flights: FlightData[];

    hotels: HotelData[];

    transports: TransportData[];

    excursions: ExcursionData[];

}


export default function PackageCreationWizard(){

    const [step,setStep]=useState(0);

    const [wizardData,setWizardData]=useState<WizardData>({

        package:{

            name:"",
            country:"",
            destination:"",
            departureDate:"",
            returnDate:"",
            description:"",
            basePrice:0

        },

        flights:[
        {
            airline:"",
            departureLocation:"",
            destination:"",
            departureDate:"",
            departureTime:"",
            arrivalTime:"",
            returnDate:"",
            returnDepartureTime:"",
            returnArrivalTime:"",
            flightNumber:""
        }
        ],

        hotels:[{
            name:"",
            stars:3,
            country:"",
            city:"",
            address:""
        }],

        transports:[{
            route:"",
            company:""
        }],

        excursions:[{
            name:"",
            location:"",
            description:""
        }]

    });

    const next=()=>setStep((s)=>s+1);

    const previous=()=>setStep((s)=>s-1);

    return(

        <div className="space-y-8">

            <PackageStepper current={step}/>

            {

                step===0 && (

                    <StepPackage

                        data={wizardData}

                        setData={setWizardData}

                        next={next}

                    />

                )

            }

            {

                step===1 && (

                    <StepFlight

                        data={wizardData}

                        setData={setWizardData}

                        next={next}

                        previous={previous}

                    />

                )

            }

            {

                step===2 && (

                    <StepHotel

                        data={wizardData}

                        setData={setWizardData}

                        next={next}

                        previous={previous}

                    />

                )

            }

            {

                step===3 && (

                    <StepTransport

                        data={wizardData}

                        setData={setWizardData}

                        next={next}

                        previous={previous}

                    />

                )

            }

            {

                step===4 && (

                    <StepExcursion

                        data={wizardData}

                        setData={setWizardData}

                        next={next}

                        previous={previous}

                    />

                )

            }

            {

                step===5 && (

                    <StepReview

                        data={wizardData}

                        previous={previous}

                    />

                )

            }

        </div>

    )

}
