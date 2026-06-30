
"use client";

import {useState} from "react";

import PackageStepper from "./PackageStepper";

import StepPackage from "./steps/StepPackage";
import StepFlight from "./steps/StepFlight";
import StepHotel from "./steps/StepHotel";
import StepTransport from "./steps/StepTransport";
import StepExcursion from "./steps/StepExcursion";
import StepReview from "./steps/StepReview";


interface WizardData{

    id_pack?:number;

    id_vol?:number;

    id_hot?:number;

    id_transp?:number;

    id_exc?:number;

    nbVoyageurs:number;

    classeVol:string;

    typeChambre:string;

    pension:string;

    package:any;

    flight:any;

    hotel:any;

    transport:any;

    excursion:any;

}


export default function PackageCreationWizard(){

    const [step,setStep]=useState(0);

    const [wizardData,setWizardData]=useState<WizardData>({

        package:{},

        flight:{},

        hotel:{},

        transport:{},

        excursion:{},

        nbVoyageurs:1,

        classeVol:"ECONOMY",

        typeChambre:"DOUBLE",

        pension:"BED_BREAKFAST",

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
