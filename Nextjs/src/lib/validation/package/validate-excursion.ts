
import {

    EXCURSION_RULES,

} from "./package.rules";

import type {

    ExcursionErrors,

    ExcursionValidator,

} from "./types";

export const validateExcursion: ExcursionValidator = (

    data,

) => {

    const errors: ExcursionErrors = {};

    /* =====================================================
       Nom
    ===================================================== */

    const name = data.name.trim();

    if (!name) {

        errors.name =
            "Le nom de l'excursion est obligatoire.";

    }

    else if (

        name.length < EXCURSION_RULES.NAME.MIN

    ) {

        errors.name =
            `Le nom doit contenir au moins ${EXCURSION_RULES.NAME.MIN} caractères.`;

    }

    else if (

        name.length > EXCURSION_RULES.NAME.MAX

    ) {

        errors.name =
            `Le nom ne peut pas dépasser ${EXCURSION_RULES.NAME.MAX} caractères.`;

    }

    /* =====================================================
       Lieu
    ===================================================== */

    const location = data.location.trim();

    if (!location) {

        errors.location =
            "Le lieu est obligatoire.";

    }

    else if (

        location.length < EXCURSION_RULES.LOCATION.MIN

    ) {

        errors.location =
            `Le lieu doit contenir au moins ${EXCURSION_RULES.LOCATION.MIN} caractères.`;

    }

    else if (

        location.length > EXCURSION_RULES.LOCATION.MAX

    ) {

        errors.location =
            `Le lieu ne peut pas dépasser ${EXCURSION_RULES.LOCATION.MAX} caractères.`;

    }

    /* =====================================================
       Description
    ===================================================== */

    const description = data.description.trim();

    if (!description) {

        errors.description =
            "La description est obligatoire.";

    }

    else if (

        description.length < EXCURSION_RULES.DESCRIPTION.MIN

    ) {

        errors.description =
            `La description doit contenir au moins ${EXCURSION_RULES.DESCRIPTION.MIN} caractères.`;

    }

    else if (

        description.length > EXCURSION_RULES.DESCRIPTION.MAX

    ) {

        errors.description =
            `La description ne peut pas dépasser ${EXCURSION_RULES.DESCRIPTION.MAX} caractères.`;

    }

    return errors;

};
