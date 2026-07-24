
import type { WizardFormData } from "@/types/package/wizard-form-data";

export function validatePackageStep(data: WizardFormData) {

    const errors: Record<string, string> = {};

    if (!data.package.name.trim()) {
        errors.name = "Le nom est obligatoire";
    }

    if (!data.package.country.trim()) {
        errors.country = "Le pays est obligatoire";
    }

    if (!data.package.destination.trim()) {
        errors.destination = "La destination est obligatoire";
    }

    if (!data.package.departureDate) {
        errors.departureDate = "La date de départ est obligatoire";
    }

    if (!data.package.returnDate) {
        errors.returnDate = "La date de retour est obligatoire";
    }

    if (
        data.package.departureDate &&
        data.package.returnDate &&
        data.package.returnDate < data.package.departureDate
    ) {
        errors.returnDate =
            "La date de retour doit être après le départ";
    }

    if (data.package.basePrice <= 0) {
        errors.basePrice =
            "Le prix doit être supérieur à 0";
    }

    if(data.package.totalStock<=0){
        errors.totalStock =
            "Le nombre de places doit être supérieur à 0";
    }

    return errors;

}
