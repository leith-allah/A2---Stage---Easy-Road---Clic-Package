
"use client";

import { createContext } from "react";
import { WizardFormData } from "@/types/package/wizard-form-data";

export interface PackageWizardContextType {

    step: number;

    touchedSteps: number[];

    setTouchedSteps: React.Dispatch<
        React.SetStateAction<number[]>
    >;

    data: WizardFormData;

    setData: React.Dispatch<React.SetStateAction<WizardFormData>>;

    errors: Record<string, string>;

    setErrors: React.Dispatch<
        React.SetStateAction<Record<string, string>>
    >;

    goToStep: (step: number) => void;

    next: () => void;

    previous: () => void;

    // 🔒 Nouveaux champs optionnels pour le mode édition (sans impact sur la création)

    isEdit?: boolean;
    packageId?: number;

}

export const PackageWizardContext =
    createContext<PackageWizardContextType | null>(null);

    