/*
"use client";

import { usePackageWizard }
from "@/app/(admin)/dashboard/admin/packages/create/hooks/usePackageWizard";

import StepPackage
from "@/components/packages/create/steps/StepPackage";

import StepFlight
from "@/components/packages/create/steps/StepFlight";

import StepHotel
from "@/components/packages/create/steps/StepHotel";

import StepTransport
from "@/components/packages/create/steps/StepTransport";

import StepExcursion
from "@/components/packages/create/steps/StepExcursion";

import StepReview
from "@/components/packages/create/steps/StepReview";

import WizardProgress
from "@/app/(admin)/dashboard/admin/packages/create/components/WizardProgress";

export default function PackageWizard() {

  const wizard =
    usePackageWizard();

  const steps = [

    <StepPackage
      wizard={wizard}
      key="package"
    />,

    <StepFlight
      wizard={wizard}
      key="flight"
    />,

    <StepHotel
      wizard={wizard}
      key="hotel"
    />,

    <StepTransport
      wizard={wizard}
      key="transport"
    />,

    <StepExcursion
      wizard={wizard}
      key="excursion"
    />,

    <StepReview
      wizard={wizard}
      key="summary"
    />,

  ];

  return (

    <div className="space-y-8">

      <WizardProgress

        currentStep={wizard.step}

      />

      {steps[wizard.step]}

    </div>

  );

}
*/