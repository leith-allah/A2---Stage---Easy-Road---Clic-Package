
"use client";

import { useWizardUpdater } from "@/hooks/useWizardUpdater";
import { usePackageWizard } from "@/context/usePackageWizard";
import { useWizardValidation } from "@/hooks/useWizardValidation";

import {
    RoomType,
    BoardType,
} from "@/server/entities/value-objects/supplements.value-object";

import FormSection from "../ui/FormSection";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";

import StepNavigation from "../ui/StepNavigation";


export default function StepHotel() {

    const {

        data,
        setData,

        next,
        previous,
        
        step,
        setTouchedSteps,

    } = usePackageWizard();

    const {
        errors,
        canGoNext,
        canLeaveCurrentStep,
    } = useWizardValidation();

    const hotelErrors = errors.hotels ?? [];

    const {
        updateHotel,
        updateSupplement,
    } = useWizardUpdater(
        setData,
        step,
        setTouchedSteps
    );

  function handleNext() {

      if (!canGoNext()) return;

      next();

  }


  return (

    <div className="space-y-6">

      <FormSection title="Informations de l'hôtel">

          <FormInput
              label="Nom"
              required
              value={data.hotels[0].name}
              error={hotelErrors[0]?.name}
              onChange={(value)=>
                  updateHotel(0,"name",value)
              }
          />

          <FormInput
              type="number"
              label="Nombre d'étoiles"
              value={data.hotels[0].stars}
              error={hotelErrors[0]?.stars}
              onChange={(value)=>
                  updateHotel(
                      0,
                      "stars",
                      Number(value)
                  )
              }
          />

          <FormInput
              label="Pays"
              required
              value={data.hotels[0].country}
              error={hotelErrors[0]?.country}
              onChange={(value)=>
                  updateHotel(
                      0,
                      "country",
                      value
                  )
              }
          />

          <FormInput
              label="Ville"
              required
              value={data.hotels[0].city}
              error={hotelErrors[0]?.city}
              onChange={(value)=>
                  updateHotel(
                      0,
                      "city",
                      value
                  )
              }
          />

          <FormInput
              label="Adresse"
              required
              value={data.hotels[0].address}
              error={hotelErrors[0]?.address}
              onChange={(value)=>
                  updateHotel(
                      0,
                      "address",
                      value
                  )
              }
          />

      </FormSection>


      <FormSection title="Chambres">

          <FormSelect
              label="Chambre par défaut"
              value={data.supplements.defaultRoomType}
              onChange={(value) =>
                  updateSupplement(
                      "defaultRoomType",
                      value as RoomType
                  )
              }
              options={[
                  { label: "SINGLE", value: "SINGLE" },
                  { label: "DOUBLE", value: "DOUBLE" },
                  { label: "TRIPLE", value: "TRIPLE" },
                  { label: "QUADRUPLE", value: "QUADRUPLE" },
                  { label: "SUITE", value: "SUITE" },
              ]}
          />

          <div className="grid grid-cols-2 gap-4">

              <FormInput
                  type="number"
                  label="Supplément Single"
                  value={data.supplements.SINGLE}
                  onChange={(value) =>
                      updateSupplement(
                          "SINGLE",
                          Number(value)
                      )
                  }
              />

              <FormInput
                  type="number"
                  label="Supplément Double"
                  value={data.supplements.DOUBLE}
                  onChange={(value) =>
                      updateSupplement(
                          "DOUBLE",
                          Number(value)
                      )
                  }
              />

              <FormInput
                  type="number"
                  label="Supplément Triple"
                  value={data.supplements.TRIPLE}
                  onChange={(value) =>
                      updateSupplement(
                          "TRIPLE",
                          Number(value)
                      )
                  }
              />

              <FormInput
                  type="number"
                  label="Supplément Quadruple"
                  value={data.supplements.QUADRUPLE}
                  onChange={(value) =>
                      updateSupplement(
                          "QUADRUPLE",
                          Number(value)
                      )
                  }
              />

              <FormInput
                  type="number"
                  label="Supplément Suite"
                  value={data.supplements.SUITE}
                  onChange={(value) =>
                      updateSupplement(
                          "SUITE",
                          Number(value)
                      )
                  }
              />

          </div>

      </FormSection>


      <FormSection title="Pensions">

          <FormSelect
              label="Pension par défaut"
              value={data.supplements.defaultBoardType}
              onChange={(value) =>
                  updateSupplement(
                      "defaultBoardType",
                      value as BoardType
                  )
              }
              options={[
                  { label: "Bed Only", value: "BED_ONLY" },
                  { label: "Bed Breakfast", value: "BED_BREAKFAST" },
                  { label: "Half Board", value: "HALF_BOARD" },
                  { label: "Full Board", value: "FULL_BOARD" },
                  { label: "All Inclusive", value: "ALL_INCLUSIVE" },
              ]}
          />

          <div className="grid grid-cols-2 gap-4">

              <FormInput
                  type="number"
                  label="Supplément Bed Only"
                  value={data.supplements.BED_ONLY}
                  onChange={(value) =>
                      updateSupplement(
                          "BED_ONLY",
                          Number(value)
                      )
                  }
              />

              <FormInput
                  type="number"
                  label="Supplément Bed Breakfast"
                  value={data.supplements.BED_BREAKFAST}
                  onChange={(value) =>
                      updateSupplement(
                          "BED_BREAKFAST",
                          Number(value)
                      )
                  }
              />

              <FormInput
                  type="number"
                  label="Supplément Half Board"
                  value={data.supplements.HALF_BOARD}
                  onChange={(value) =>
                      updateSupplement(
                          "HALF_BOARD",
                          Number(value)
                      )
                  }
              />

              <FormInput
                  type="number"
                  label="Supplément Full Board"
                  value={data.supplements.FULL_BOARD}
                  onChange={(value) =>
                      updateSupplement(
                          "FULL_BOARD",
                          Number(value)
                      )
                  }
              />

              <FormInput
                  type="number"
                  label="Supplément All Inclusive"
                  value={data.supplements.ALL_INCLUSIVE}
                  onChange={(value) =>
                      updateSupplement(
                          "ALL_INCLUSIVE",
                          Number(value)
                      )
                  }
              />

          </div>

      </FormSection>

      <StepNavigation
          onPrevious={previous}
          previousDisabled={!canLeaveCurrentStep()}
          onNext={handleNext}
          nextDisabled={!canGoNext()}
      />

    </div>

  );

}
