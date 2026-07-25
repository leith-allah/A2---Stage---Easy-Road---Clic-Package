
import {

    PACKAGE_RULES,

} from "./package.rules";

import type {

    PackageErrors,

    PackageValidator,

} from "./types";

export const validatePackage: PackageValidator = (

    data,

) => {

    const errors: PackageErrors = {};

    /* =====================================================
       Nom
    ===================================================== */

    const name = data.name.trim();

    if (!name) {

        errors.name = "Le nom du package est obligatoire.";

    }

    else if (

        name.length < PACKAGE_RULES.NAME.MIN

    ) {

        errors.name =
            `Le nom doit contenir au moins ${PACKAGE_RULES.NAME.MIN} caractères.`;

    }

    else if (

        name.length > PACKAGE_RULES.NAME.MAX

    ) {

        errors.name =
            `Le nom ne peut pas dépasser ${PACKAGE_RULES.NAME.MAX} caractères.`;

    }

    /* =====================================================
       Pays
    ===================================================== */

    if (!data.country.trim()) {

        errors.country =
            "Veuillez sélectionner un pays.";

    }

    /* =====================================================
       Destination
    ===================================================== */

    if (!data.destination.trim()) {

        errors.destination =
            "Veuillez sélectionner une destination.";

    }

    /* =====================================================
      Description (optionnelle)
    ===================================================== */

    const description = data.description.trim();

    if (

        description.length > 0 &&

        description.length < PACKAGE_RULES.DESCRIPTION.MIN

    ) {

        errors.description =
            `La description doit contenir au moins ${PACKAGE_RULES.DESCRIPTION.MIN} caractères.`;

    }

    else if (

        description.length >

        PACKAGE_RULES.DESCRIPTION.MAX

    ) {

        errors.description =
            `La description ne peut pas dépasser ${PACKAGE_RULES.DESCRIPTION.MAX} caractères.`;

    }

    /* =====================================================
       Dates
    ===================================================== */

    if (!data.departureDate) {

        errors.departureDate =
            "La date de départ est obligatoire.";

    }

    if (!data.returnDate) {

        errors.returnDate =
            "La date de retour est obligatoire.";

    }

    if (data.departureDate) {
            // Date d'aujourd'hui (mise à 00:00:00 pour comparer uniquement les jours)
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const departure = new Date(data.departureDate);
            departure.setHours(0, 0, 0, 0);

            if (departure < today) {
                errors.departureDate =
                    "La date de départ ne peut pas être antérieure à aujourd'hui.";
            }
        }

    if (

        data.departureDate &&
        data.returnDate

    ) {

        const departure = new Date(

            data.departureDate,

        );

        const returning = new Date(

            data.returnDate,

        );

        if (

            returning <= departure

        ) {

            errors.returnDate =
                "La date de retour doit être postérieure à la date de départ.";

        }

    }

    /* =====================================================
       Prix
    ===================================================== */

    if (

        data.basePrice < PACKAGE_RULES.PRICE.MIN

    ) {

        errors.basePrice =
            "Le prix ne peut pas être négatif.";

    }

    else if (

        data.basePrice > PACKAGE_RULES.PRICE.MAX

    ) {

        errors.basePrice =
            "Le prix est trop élevé.";

    }

    /* =====================================================
       Stock
    ===================================================== */

    if (

        data.totalStock < PACKAGE_RULES.STOCK.MIN

    ) {

        errors.totalStock =
            "Le stock doit être supérieur à 0.";

    }

    else if (

        data.totalStock > PACKAGE_RULES.STOCK.MAX

    ) {

        errors.totalStock =
            "Le stock dépasse la limite autorisée.";

    }

    return errors;

};
