/*
"use client";

import { useState } from "react";

import {
  WizardState,
  PackageFormData,
} from "../types/wizard.types";

export function usePackageWizard() {

  const [step, setStep] =
    useState(0);

  const [state, setState] =
    useState<WizardState>({});


    // Navigation

  function nextStep() {

    setStep((previous) => previous + 1);

  }

  function previousStep() {

    setStep((previous) =>
      Math.max(previous - 1, 0)
    );

  }

  function goToStep(index: number) {

    setStep(index);

  }

   // Package

  function setPackageData(
    data: PackageFormData
  ) {

    setState((previous) => ({

      ...previous,

      package: data,

    }));

  }

  function setPackageId(
    id: number
  ) {

    setState((previous) => ({

      ...previous,

      packageId: id,

    }));

  }


   // Flight


  function setFlightId(
    id: number
  ) {

    setState((previous) => ({

      ...previous,

      flightId: id,

    }));

  }


   // Hotel


  function setHotelId(
    id: number
  ) {

    setState((previous) => ({

      ...previous,

      hotelId: id,

    }));

  }


   // Transport


  function setTransportId(
    id: number
  ) {

    setState((previous) => ({

      ...previous,

      transportId: id,

    }));

  }


   // Excursion


  function setExcursionId(
    id: number
  ) {

    setState((previous) => ({

      ...previous,

      excursionId: id,

    }));

  }

  return {

    step,

    state,

    nextStep,

    previousStep,

    goToStep,

    setPackageData,

    setPackageId,

    setFlightId,

    setHotelId,

    setTransportId,

    setExcursionId,

  };

}

*/