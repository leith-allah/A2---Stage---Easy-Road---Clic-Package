
import {

    HOTEL_RULES,

} from "./package.rules";

import type {

    HotelErrors,

    HotelValidator,

} from "./types";

export const validateHotel: HotelValidator = (

    data,

) => {

    const errors: HotelErrors = {};

    /* =====================================================
       Nom
    ===================================================== */

    const name = data.name.trim();

    if (!name) {

        errors.name =
            "Le nom de l'hôtel est obligatoire.";

    }

    else if (

        name.length < HOTEL_RULES.NAME.MIN

    ) {

        errors.name =
            `Le nom doit contenir au moins ${HOTEL_RULES.NAME.MIN} caractères.`;

    }

    else if (

        name.length > HOTEL_RULES.NAME.MAX

    ) {

        errors.name =
            `Le nom ne peut pas dépasser ${HOTEL_RULES.NAME.MAX} caractères.`;

    }

    /* =====================================================
       Pays
    ===================================================== */

    const country = data.country.trim();

    if (!country) {

        errors.country =
            "Le pays est obligatoire.";

    }

    else if (

        country.length < HOTEL_RULES.COUNTRY.MIN

    ) {

        errors.country =
            "Le pays est invalide.";

    }

    /* =====================================================
       Ville
    ===================================================== */

    const city = data.city.trim();

    if (!city) {

        errors.city =
            "La ville est obligatoire.";

    }

    else if (

        city.length < HOTEL_RULES.CITY.MIN

    ) {

        errors.city =
            "La ville est invalide.";

    }

    /* =====================================================
       Adresse
    ===================================================== */

    const address = data.address.trim();

    if (!address) {

        errors.address =
            "L'adresse est obligatoire.";

    }

    else if (

        address.length < HOTEL_RULES.ADDRESS.MIN

    ) {

        errors.address =
            `L'adresse doit contenir au moins ${HOTEL_RULES.ADDRESS.MIN} caractères.`;

    }

    else if (

        address.length > HOTEL_RULES.ADDRESS.MAX

    ) {

        errors.address =
            `L'adresse ne peut pas dépasser ${HOTEL_RULES.ADDRESS.MAX} caractères.`;

    }

    /* =====================================================
       Etoiles
    ===================================================== */

    if (

        data.stars < HOTEL_RULES.STARS.MIN

    ) {

        errors.stars =
            `Le nombre d'étoiles doit être compris entre ${HOTEL_RULES.STARS.MIN} et ${HOTEL_RULES.STARS.MAX}.`;

    }

    else if (

        data.stars > HOTEL_RULES.STARS.MAX

    ) {

        errors.stars =
            `Le nombre d'étoiles doit être compris entre ${HOTEL_RULES.STARS.MIN} et ${HOTEL_RULES.STARS.MAX}.`;

    }

    return errors;

};
