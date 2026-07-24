
"use client";

import PackageStepper from "./PackageStepper";

import StepPackage from "./steps/StepPackage";
import StepFlight from "./steps/StepFlight";
import StepHotel from "./steps/StepHotel";
import StepTransport from "./steps/StepTransport";
import StepExcursion from "./steps/StepExcursion";
import StepReview from "./steps/StepReview";

import { usePackageWizard } from "@/context/usePackageWizard";

export default function PackageCreationWizard() {

    const {

        step,

    } = usePackageWizard();

    return (

        <div className="space-y-8">

            <PackageStepper current={step} />

            {step === 0 && <StepPackage />}

            {step === 1 && <StepFlight />}

            {step === 2 && <StepHotel />}

            {step === 3 && <StepTransport />}

            {step === 4 && <StepExcursion />}

            {step === 5 && <StepReview />}

        </div>

    );

}
